import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export interface TextSelectionPopupState {
  text: string;
  x: number;
  y: number;
  belowY: number;
}

interface UseTextSelectionPopupOptions {
  /** Container gốc dùng làm hệ tọa độ relative (tránh lệch tọa độ khi <main> có CSS transform) */
  containerRef: RefObject<HTMLElement | null>;
  /** Vùng nội dung hợp lệ cho phép bôi đen (nếu bỏ trống sẽ dùng containerRef) */
  scopeRef?: RefObject<HTMLElement | null>;
  /** Ref tới phần tử popup/toolbar để không tự ẩn khi bấm vào nút bên trong */
  popupRef?: RefObject<HTMLElement | null>;
  /** Độ dài tối đa của đoạn bôi đen (mặc định 200) */
  maxLength?: number;
  /** Chiều rộng ước lượng của popup để kẹp trong khung hiển thị */
  estimatedWidth?: number;
  /** Chiều cao ước lượng của popup */
  estimatedHeight?: number;
  /** Khoảng đệm tối thiểu phía trên vùng hiển thị */
  minTopPadding?: number;
  /** Chỉ hiện khi có ít nhất 1 ký tự tiếng Nhật (Hiragana / Katakana / Kanji) */
  requireJapanese?: boolean;
  /** Cho phép ẩn popup khi cuộn (mặc định true) */
  hideOnScroll?: boolean;
  /** Bật/tắt hook */
  enabled?: boolean;
}

const JAPANESE_CHAR_REGEX = /[\u3040-\u30ff\u4e00-\u9faf]/;

/**
 * Lấy nội dung bôi đen sạch, loại bỏ thẻ <rt>/<rp> của Furigana để không dính cách đọc vào từ gốc.
 */
function extractCleanSelectionText(sel: Selection): string {
  if (sel.rangeCount === 0) return '';
  try {
    const fragment = sel.getRangeAt(0).cloneContents();
    fragment.querySelectorAll('rt, rp').forEach((el) => el.remove());
    const cleaned = (fragment.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (cleaned) return cleaned;
  } catch {
    // Fallback sang sel.toString() nếu cloneContents gặp node đặc biệt
  }
  return sel.toString().replace(/\s+/g, ' ').trim();
}

export function useTextSelectionPopup({
  containerRef,
  scopeRef,
  popupRef,
  maxLength = 200,
  estimatedWidth = 280,
  estimatedHeight = 40,
  minTopPadding = 8,
  requireJapanese = true,
  hideOnScroll = true,
  enabled = true,
}: UseTextSelectionPopupOptions) {
  const [selection, setSelection] = useState<TextSelectionPopupState | null>(null);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const dismissPopup = useCallback(() => {
    setSelection(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
    try {
      window.getSelection()?.removeAllRanges();
    } catch {
      // Bỏ qua lỗi trình duyệt khi không có selection
    }
  }, []);

  const updateSelection = useCallback(() => {
    if (!enabled) {
      setSelection(null);
      return;
    }

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setSelection(null);
      return;
    }

    const container = containerRef.current;
    const scope = scopeRef?.current ?? container;
    if (!container || !scope) {
      setSelection(null);
      return;
    }

    const anchorNode = sel.anchorNode;
    const focusNode = sel.focusNode;
    if (
      (anchorNode && !scope.contains(anchorNode)) ||
      (focusNode && !scope.contains(focusNode))
    ) {
      setSelection(null);
      return;
    }

    const selected = extractCleanSelectionText(sel);
    if (
      !selected ||
      selected.length > maxLength ||
      (requireJapanese && !JAPANESE_CHAR_REGEX.test(selected))
    ) {
      setSelection(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const clientRects = range.getClientRects();
    const rect = clientRects.length > 0 ? clientRects[0] : range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      setSelection(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const scopeRect = scope.getBoundingClientRect();

    // Kẹp tọa độ ngang theo toàn bộ containerRef để không bị cắt mép phải trên màn hình mobile (390px)
    const effectiveWidth = Math.min(estimatedWidth, Math.max(180, containerRect.width - 16));
    const minX = 8;
    const maxX = Math.max(minX, containerRect.width - effectiveWidth - 8);

    const rawX = rect.left - containerRect.left;
    const clampedX = Math.min(maxX, Math.max(minX, rawX));

    const minTopY = Math.max(minTopPadding, scopeRect.top - containerRect.top + 8);
    const maxBottomY = Math.max(minTopY, scopeRect.bottom - containerRect.top - estimatedHeight - 8);
    const aboveY = rect.top - containerRect.top - estimatedHeight - 8;
    const belowY = rect.bottom - containerRect.top + 8;

    const rawY = aboveY < minTopY ? belowY : aboveY;
    const clampedY = Math.min(maxBottomY, Math.max(minTopY, rawY));

    setSelection({
      text: selected,
      x: clampedX,
      y: clampedY,
      belowY,
    });
  }, [
    enabled,
    containerRef,
    scopeRef,
    maxLength,
    estimatedWidth,
    estimatedHeight,
    minTopPadding,
    requireJapanese,
  ]);

  useEffect(() => {
    if (!enabled) {
      setSelection(null);
      return;
    }

    const scheduleUpdate = (delayMs = 0) => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (delayMs === 0) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          updateSelection();
        });
      } else {
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          updateSelection();
        }, delayMs);
      }
    };

    const onPointerRelease = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && popupRef?.current?.contains(target)) {
        return;
      }
      scheduleUpdate(0);
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && popupRef?.current?.contains(target)) {
        return;
      }
      setSelection(null);
    };

    const onSelectionChange = () => {
      // Hỗ trợ kéo tay chọn chữ trên mobile (selectionchange)
      scheduleUpdate(140);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelection(null);
      }
    };

    const onScroll = () => {
      if (hideOnScroll) {
        setSelection(null);
      }
    };

    window.addEventListener('mouseup', onPointerRelease);
    window.addEventListener('touchend', onPointerRelease, { passive: true });
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    document.addEventListener('selectionchange', onSelectionChange);
    window.addEventListener('keydown', onKeyDown);
    if (hideOnScroll) {
      window.addEventListener('scroll', onScroll, true);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mouseup', onPointerRelease);
      window.removeEventListener('touchend', onPointerRelease);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('selectionchange', onSelectionChange);
      window.removeEventListener('keydown', onKeyDown);
      if (hideOnScroll) {
        window.removeEventListener('scroll', onScroll, true);
      }
    };
  }, [enabled, hideOnScroll, popupRef, updateSelection]);

  return { selection, clearSelection, dismissPopup };
}
