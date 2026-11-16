import React from 'react';

interface SenseiMarkdownProps {
  content: string;
}

/**
 * Bộ render Markdown + thẻ <ruby>Furigana</ruby> an toàn cho câu trả lời của Sensei AI.
 * Tránh dùng dangerouslySetInnerHTML cho HTML thô ngoài <ruby>/<rt>.
 */
export const SenseiMarkdown: React.FC<SenseiMarkdownProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block ```
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="my-2 p-3 rounded-xl bg-surface-container-highest text-on-surface font-mono text-xs overflow-x-auto border border-outline-variant/40"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Markdown table
    if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseCells = (row: string) =>
          row
            .trim()
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim());
        const headers = parseCells(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseCells);
        elements.push(
          <div key={`tbl-${i}`} className="my-2 overflow-x-auto rounded-xl border border-outline-variant/40">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-surface-container-high text-on-surface">
                <tr>
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-bold border-b border-outline-variant/40">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-outline-variant/20 last:border-b-0">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-on-surface-variant align-top">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const cls =
        level === 1
          ? 'text-lg font-bold text-on-surface mt-3 mb-1'
          : level === 2
          ? 'text-base font-bold text-on-surface mt-2.5 mb-1'
          : 'text-sm font-bold text-primary mt-2 mb-0.5';
      elements.push(
        <div key={`h-${i}`} className={cls}>
          {renderInline(text)}
        </div>
      );
      i++;
      continue;
    }

    // Unordered list
    if (/^\s*[-*•]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*•]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 my-1.5 space-y-1 text-on-surface">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 my-1.5 space-y-1 text-on-surface">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blank line
    if (!line.trim()) {
      elements.push(<div key={`br-${i}`} className="h-1.5" />);
      i++;
      continue;
    }

    // Normal paragraph line
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed text-on-surface my-0.5">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5 text-[15px]">{elements}</div>;
};

/** Render inline tokens: <ruby>kanji<rt>reading</rt></ruby>, `code`, **bold**, *italic*. */
function renderInline(text: string): React.ReactNode[] {
  const tokenRegex =
    /(<ruby>[^<]+<rt>[^<]+<\/rt><\/ruby>|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    const rubyMatch = part.match(/^<ruby>([^<]+)<rt>([^<]+)<\/rt><\/ruby>$/);
    if (rubyMatch) {
      const base = rubyMatch[1].trim();
      const rt = rubyMatch[2].trim();
      const hasKanji = /[\u4e00-\u9fff]/.test(base);
      if (!hasKanji || base === rt) {
        return <React.Fragment key={idx}>{base}</React.Fragment>;
      }
      return (
        <ruby key={idx} className="font-jp mx-0.5">
          {base}
          <rt className="text-[10px] text-primary font-normal select-none">{rt}</rt>
        </ruby>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-surface-container-high text-primary font-mono text-[13px] border border-outline-variant/30"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-on-surface">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Dọn sạch thẻ <ruby>/<rt> bị lỗi hoặc tách dòng nếu lỡ xuất hiện
    const cleaned = part.replace(/<\/?(?:ruby|rt)>/gi, '');
    return <React.Fragment key={idx}>{cleaned}</React.Fragment>;
  });
}

