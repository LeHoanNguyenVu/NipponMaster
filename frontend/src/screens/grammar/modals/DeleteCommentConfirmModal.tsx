import React from 'react';
import { createPortal } from 'react-dom';
import { Trash2, X, Loader2 } from 'lucide-react';

interface DeleteCommentConfirmModalProps {
  deleteConfirmTarget: {
    discussionId: number;
    isReply: boolean;
    parentId?: number;
  } | null;
  isDeletingComment: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteCommentConfirmModal: React.FC<DeleteCommentConfirmModalProps> = ({
  deleteConfirmTarget,
  isDeletingComment,
  onCancel,
  onConfirm,
}) => {
  if (!deleteConfirmTarget) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={() => !isDeletingComment && onCancel()}
    >
      <div
        className="bg-white border-2 border-[#1c1917] p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl relative text-left animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          disabled={isDeletingComment}
          onClick={onCancel}
          className="absolute top-3.5 right-3.5 text-[#78716c] hover:text-[#1c1917] p-1 transition-colors cursor-pointer disabled:opacity-50"
          title="Đóng (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div className="space-y-1 pr-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b91c1c] block">
              NIPPONMASTER
            </span>
            <h3 className="font-serif font-bold text-base text-[#1c1917] leading-snug">
              Xác nhận xóa comment
            </h3>
            <p className="text-xs text-[#57534e] mt-2 leading-relaxed">
              {deleteConfirmTarget.isReply
                ? 'Bạn có chắc chắn muốn xóa câu trả lời này không? Hành động này không thể hoàn tác.'
                : 'Bạn có chắc chắn muốn xóa comment này không? Tất cả các câu trả lời bên dưới cũng sẽ bị xóa theo.'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e7e5e4]">
          <button
            type="button"
            disabled={isDeletingComment}
            onClick={onCancel}
            className="px-4 py-2 text-xs font-mono font-medium text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f5f4] border border-[#d6d3d1] transition-all cursor-pointer disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            disabled={isDeletingComment}
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-mono font-bold bg-[#b91c1c] hover:bg-[#991b1b] text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {isDeletingComment ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang xóa...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

