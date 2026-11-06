import React from 'react';
import { Link, X } from 'lucide-react';

interface UrlInputModalProps {
  showUrlInputModal: 'image' | 'video' | null;
  mediaUrlInput: string;
  onUrlChange: (val: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const UrlInputModal: React.FC<UrlInputModalProps> = ({
  showUrlInputModal,
  mediaUrlInput,
  onUrlChange,
  onConfirm,
  onClose,
}) => {
  if (!showUrlInputModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1c1917] p-5 max-w-md w-full shadow-xl relative animate-in fade-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#78716c] hover:text-[#1c1917] p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Link className="w-4 h-4 text-[#b91c1c]" />
          <h4 className="font-serif font-bold text-sm text-[#1c1917]">
            Chèn liên kết {showUrlInputModal === 'image' ? 'hình ảnh' : 'video'}
          </h4>
        </div>

        <p className="text-xs text-[#78716c] mb-3">
          Nhập đường dẫn trực tiếp (URL) của {showUrlInputModal === 'image' ? 'ảnh' : 'video'} để đính kèm vào bài viết.
        </p>

        <input
          type="url"
          value={mediaUrlInput}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder={`https://example.com/${showUrlInputModal === 'image' ? 'photo.jpg' : 'video.mp4'}`}
          className="w-full text-xs font-mono px-3 py-2 border border-[#d6d3d1] focus:outline-hidden focus:border-[#b91c1c] mb-4"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onConfirm();
            }
          }}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-mono border border-[#d6d3d1] text-[#78716c] hover:bg-[#fafaf9] cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 text-xs font-mono font-bold bg-[#b91c1c] text-white hover:bg-[#991b1b] cursor-pointer"
          >
            Chèn link
          </button>
        </div>
      </div>
    </div>
  );
};

