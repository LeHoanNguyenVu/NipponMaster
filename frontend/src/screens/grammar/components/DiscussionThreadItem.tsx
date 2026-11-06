import React from 'react';
import {
  ThumbsUp,
  CornerDownRight,
  Trash2,
  Play,
  X,
  FolderOpen,
  Smile,
  Send,
  Loader2,
} from 'lucide-react';
import { EMOJI_LIST, type GrammarDiscussionDto, type LightboxMedia } from '../types';

interface DiscussionThreadItemProps {
  discussion: GrammarDiscussionDto;
  currentAuthorName: string;
  isTeacher: boolean;
  currentUserId?: number;
  replyingToDiscussionId: number | null;
  replyText: string;
  replyAttachedImage: string | null;
  replyAttachedVideo: string | null;
  showReplyEmoji: boolean;
  isUploadingMedia: boolean;
  onOpenMedia: (media: LightboxMedia) => void;
  onLike: (id: number) => void;
  onToggleReply: (id: number) => void;
  onRequestDelete: (id: number, isReply: boolean, parentId?: number) => void;
  onReplyTextChange: (val: string) => void;
  onRemoveReplyImage: () => void;
  onRemoveReplyVideo: () => void;
  onToggleReplyEmoji: () => void;
  onSelectReplyEmoji: (emoji: string) => void;
  onTriggerReplyImageInput: () => void;
  onTriggerReplyVideoInput: () => void;
  onSubmitReply: (id: number) => void;
}

export const DiscussionThreadItem: React.FC<DiscussionThreadItemProps> = ({
  discussion: d,
  currentAuthorName,
  isTeacher,
  currentUserId,
  replyingToDiscussionId,
  replyText,
  replyAttachedImage,
  replyAttachedVideo,
  showReplyEmoji,
  isUploadingMedia,
  onOpenMedia,
  onLike,
  onToggleReply,
  onRequestDelete,
  onReplyTextChange,
  onRemoveReplyImage,
  onRemoveReplyVideo,
  onToggleReplyEmoji,
  onSelectReplyEmoji,
  onTriggerReplyImageInput,
  onTriggerReplyVideoInput,
  onSubmitReply,
}) => {
  const isAuthor =
    isTeacher ||
    (currentUserId && d.authorId && currentUserId === d.authorId) ||
    d.authorName === currentAuthorName;

  return (
    <div className="p-4 border border-[#e7e5e4] bg-[#fafaf9] space-y-3">
      {/* Header comment cha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-full ${
              d.avatarBg || 'bg-blue-600'
            } text-white flex items-center justify-center font-bold text-xs shadow-2xs`}
          >
            {d.avatarLetter}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-xs font-bold ${d.isSensei ? 'text-[#b91c1c]' : 'text-[#1c1917]'}`}>
                {d.authorName}
              </span>
              {d.isSensei ? (
                <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#fecaca]">
                  Giảng viên
                </span>
              ) : (
                <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono border border-[#e7e5e4]">
                  Học viên
                </span>
              )}
              <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#e7e5e4]">
                {d.authorLevel || (d.isSensei ? 'N1' : 'N5')}
              </span>
            </div>
            <span className="text-[10px] text-[#a8a29e] font-mono">{d.timeAgo}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(d.id)}
            className="flex items-center gap-1 text-[11px] font-mono text-[#78716c] hover:text-[#b91c1c] transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{d.helpfulCount}</span>
          </button>
          <button
            onClick={() => onToggleReply(d.id)}
            className="px-2.5 py-1 text-xs font-mono font-bold border border-[#d6d3d1] bg-white text-[#1c1917] hover:border-[#b91c1c] hover:text-[#b91c1c] flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <CornerDownRight className="w-3 h-3 text-[#b91c1c]" />
            <span>Trả lời ({(d.replies || []).length})</span>
          </button>

          {isAuthor && (
            <button
              type="button"
              onClick={() => onRequestDelete(d.id, false)}
              title="Xóa comment"
              className="p-1 text-[#a8a29e] hover:text-[#b91c1c] hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-[#1c1917] leading-relaxed whitespace-pre-wrap pl-1">
        {d.content}
      </p>

      {/* Render ảnh đính kèm */}
      {d.imageUrl && (
        <div className="pt-1 pl-1">
          <div
            onClick={() => onOpenMedia({ type: 'image', url: d.imageUrl! })}
            className="relative group inline-block cursor-pointer overflow-hidden rounded-xs border border-[#e7e5e4] shadow-xs hover:shadow-md transition-all my-1"
            title="Bấm để phóng to ảnh như Facebook"
          >
            <img
              src={d.imageUrl}
              alt="Đính kèm"
              className="max-h-64 max-w-full object-contain bg-white group-hover:scale-[1.01] transition-transform duration-200 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Render video đính kèm */}
      {d.videoUrl && (
        <div className="pt-1 pl-1">
          <div
            onClick={() => onOpenMedia({ type: 'video', url: d.videoUrl! })}
            onMouseEnter={(e) => {
              const v = e.currentTarget.querySelector('video');
              if (v) v.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              const v = e.currentTarget.querySelector('video');
              if (v) {
                v.pause();
                v.currentTime = 0;
              }
            }}
            className="relative group cursor-pointer overflow-hidden rounded-xs border border-[#292524] bg-black max-w-md shadow-md transition-all hover:border-[#b91c1c] my-1"
            title="Rê chuột xem thử không tiếng · Bấm vào để phóng to xem đầy đủ"
          >
            <video
              src={d.videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full max-h-60 object-cover bg-black pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/30 shadow-md">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread Replies */}
      {d.replies && d.replies.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-[#e7e5e4] pl-3 sm:pl-6">
          {d.replies.map((reply) => {
            const isReplyTeacher = reply.isSensei || reply.role === 'teacher';
            const isReplyAuthor =
              isTeacher ||
              (currentUserId && reply.authorId && currentUserId === reply.authorId) ||
              reply.authorName === currentAuthorName;

            return (
              <div
                key={reply.id}
                className={`p-3 border transition-colors ${
                  isReplyTeacher
                    ? 'bg-white border-[#fecaca] border-l-4 border-l-[#b91c1c]'
                    : 'bg-white border-[#e7e5e4] border-l-4 border-l-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <div
                      className={`w-5 h-5 rounded-full ${
                        reply.avatarBg || 'bg-blue-600'
                      } text-white flex items-center justify-center text-[10px] font-bold`}
                    >
                      {reply.avatarLetter}
                    </div>
                    <span className={`font-bold ${isReplyTeacher ? 'text-[#b91c1c]' : 'text-[#1c1917]'}`}>
                      {reply.authorName}
                    </span>
                    {isReplyTeacher ? (
                      <span className="px-1.5 py-0.2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#fecaca]">
                        Giảng viên
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 bg-[#f5f5f4] text-[#78716c] text-[10px] font-mono border border-[#e7e5e4]">
                        Học viên
                      </span>
                    )}
                    <span className="px-1.5 py-0.2 bg-[#fafaf9] text-[#b91c1c] text-[10px] font-mono font-bold border border-[#e7e5e4]">
                      {reply.authorLevel || (isReplyTeacher ? 'N1' : 'N5')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#a8a29e] font-mono">{reply.timeAgo}</span>
                    {isReplyAuthor && (
                      <button
                        type="button"
                        onClick={() => onRequestDelete(reply.id, true, d.id)}
                        title="Xóa comment"
                        className="text-[#a8a29e] hover:text-[#b91c1c] p-0.5 rounded-xs transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#1c1917] leading-relaxed pl-7 whitespace-pre-wrap">
                  {reply.content}
                </p>

                {reply.imageUrl && (
                  <div className="pl-7 pt-1">
                    <div
                      onClick={() => onOpenMedia({ type: 'image', url: reply.imageUrl! })}
                      className="cursor-pointer inline-block"
                    >
                      <img
                        src={reply.imageUrl}
                        alt="Reply attachment"
                        className="max-h-48 rounded-xs border border-[#e7e5e4] object-contain shadow-2xs hover:opacity-90 pointer-events-none"
                      />
                    </div>
                  </div>
                )}

                {reply.videoUrl && (
                  <div className="pl-7 pt-1">
                    <div
                      onClick={() => onOpenMedia({ type: 'video', url: reply.videoUrl! })}
                      className="cursor-pointer inline-block max-w-sm rounded-xs border border-black overflow-hidden relative"
                    >
                      <video src={reply.videoUrl} className="w-full max-h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-8 h-8 fill-white text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Form viết câu trả lời (Reply box) */}
      {replyingToDiscussionId === d.id && (
        <div className="mt-3 p-3 bg-white border border-[#b91c1c]/40 rounded-xs space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-mono text-[#78716c]">
            <span>
              Trả lời bình luận của <strong>{d.authorName}</strong>:
            </span>
            <button
              onClick={() => onToggleReply(d.id)}
              className="text-[#a8a29e] hover:text-black cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            placeholder="Nhập câu trả lời hoặc trao đổi thêm..."
            rows={2}
            className="w-full text-xs font-serif p-2 border border-[#d6d3d1] focus:outline-hidden focus:border-[#b91c1c] resize-y"
          />

          {/* Preview reply media */}
          {(replyAttachedImage || replyAttachedVideo) && (
            <div className="flex items-center gap-2 pt-1">
              {replyAttachedImage && (
                <div className="relative inline-block border border-[#d6d3d1]">
                  <img src={replyAttachedImage} alt="Reply preview" className="w-16 h-12 object-cover" />
                  <button
                    onClick={onRemoveReplyImage}
                    className="absolute -top-1.5 -right-1.5 bg-[#b91c1c] text-white rounded-full p-0.5 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
              {replyAttachedVideo && (
                <div className="relative inline-block border border-black bg-black">
                  <video src={replyAttachedVideo} className="w-16 h-12 object-cover" />
                  <button
                    onClick={onRemoveReplyVideo}
                    className="absolute -top-1.5 -right-1.5 bg-[#b91c1c] text-white rounded-full p-0.5 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reply emoji popover */}
          {showReplyEmoji && (
            <div className="p-2 bg-white border border-[#e7e5e4] shadow-sm flex flex-wrap gap-1 max-w-sm">
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onSelectReplyEmoji(emoji)}
                  className="w-7 h-7 flex items-center justify-center text-sm hover:bg-[#f5f5f4] cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onTriggerReplyImageInput}
                className="px-2 py-1 text-[11px] border border-[#d6d3d1] hover:bg-[#f5f5f4] flex items-center gap-1 text-[#57534e] cursor-pointer"
                title="Đính kèm ảnh"
              >
                <FolderOpen className="w-3 h-3 text-[#b91c1c]" />
                <span>Ảnh</span>
              </button>
              <button
                type="button"
                onClick={onTriggerReplyVideoInput}
                className="px-2 py-1 text-[11px] border border-[#d6d3d1] hover:bg-[#f5f5f4] flex items-center gap-1 text-[#57534e] cursor-pointer"
                title="Đính kèm video"
              >
                <FolderOpen className="w-3 h-3 text-[#b91c1c]" />
                <span>Video</span>
              </button>
              <button
                type="button"
                onClick={onToggleReplyEmoji}
                className={`p-1 border text-[#57534e] hover:bg-[#f5f5f4] cursor-pointer ${
                  showReplyEmoji ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'border-[#d6d3d1]'
                }`}
                title="Chèn biểu tượng cảm xúc"
              >
                <Smile className="w-3.5 h-3.5" />
              </button>
              {isUploadingMedia && (
                <span className="text-[10px] font-mono text-[#b91c1c] flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Đang tải...
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSubmitReply(d.id)}
              className="px-3.5 py-1.5 bg-[#1c1917] text-white text-xs font-mono font-bold hover:bg-[#b91c1c] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Gửi trả lời</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

