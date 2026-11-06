import React from 'react';
import { FolderOpen, Link, Smile, Send, Loader2, Play, X } from 'lucide-react';
import { DiscussionThreadItem } from './DiscussionThreadItem';
import { EMOJI_LIST, type GrammarDiscussionDto, type LightboxMedia } from '../types';

interface GrammarDiscussionTabProps {
  discussions: GrammarDiscussionDto[];
  questionText: string;
  attachedImage: string | null;
  attachedVideo: string | null;
  showEmojiPicker: boolean;
  isUploadingMedia: boolean;
  currentAuthorName: string;
  currentUserRole: 'teacher' | 'student';
  isTeacher: boolean;
  currentUserId?: number;
  replyingToDiscussionId: number | null;
  replyText: string;
  replyAttachedImage: string | null;
  replyAttachedVideo: string | null;
  showReplyEmoji: boolean;
  onQuestionTextChange: (val: string) => void;
  onRemoveAttachedImage: () => void;
  onRemoveAttachedVideo: () => void;
  onToggleEmojiPicker: () => void;
  onSelectEmoji: (emoji: string) => void;
  onOpenUrlModal: (type: 'image' | 'video') => void;
  onTriggerMainImageInput: () => void;
  onTriggerMainVideoInput: () => void;
  onPostQuestion: () => void;
  onOpenMedia: (media: LightboxMedia) => void;
  onLikeDiscussion: (id: number) => void;
  onToggleReply: (id: number) => void;
  onRequestDeleteDiscussion: (id: number, isReply: boolean, parentId?: number) => void;
  onReplyTextChange: (val: string) => void;
  onRemoveReplyImage: () => void;
  onRemoveReplyVideo: () => void;
  onToggleReplyEmoji: () => void;
  onSelectReplyEmoji: (emoji: string) => void;
  onTriggerReplyImageInput: () => void;
  onTriggerReplyVideoInput: () => void;
  onSubmitReply: (id: number) => void;
}

export const GrammarDiscussionTab: React.FC<GrammarDiscussionTabProps> = ({
  discussions,
  questionText,
  attachedImage,
  attachedVideo,
  showEmojiPicker,
  isUploadingMedia,
  currentAuthorName,
  currentUserRole,
  isTeacher,
  currentUserId,
  replyingToDiscussionId,
  replyText,
  replyAttachedImage,
  replyAttachedVideo,
  showReplyEmoji,
  onQuestionTextChange,
  onRemoveAttachedImage,
  onRemoveAttachedVideo,
  onToggleEmojiPicker,
  onSelectEmoji,
  onOpenUrlModal,
  onTriggerMainImageInput,
  onTriggerMainVideoInput,
  onPostQuestion,
  onOpenMedia,
  onLikeDiscussion,
  onToggleReply,
  onRequestDeleteDiscussion,
  onReplyTextChange,
  onRemoveReplyImage,
  onRemoveReplyVideo,
  onToggleReplyEmoji,
  onSelectReplyEmoji,
  onTriggerReplyImageInput,
  onTriggerReplyVideoInput,
  onSubmitReply,
}) => {
  return (
    <div className="space-y-6">
      {/* Khung soạn câu hỏi */}
      <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-[#78716c]">
          <span className="font-mono font-bold text-[#1c1917] flex items-center gap-1.5 uppercase">
            <span className="text-base">💬</span> Đặt câu hỏi hoặc thảo luận về bài học:
          </span>
          <span className="text-[11px] font-mono">
            Đang đăng với tư cách: <strong className="text-[#1c1917]">{currentAuthorName}</strong> (
            {currentUserRole === 'teacher' ? 'Giảng viên' : 'Học viên'})
          </span>
        </div>

        <textarea
          rows={3}
          value={questionText}
          onChange={(e) => onQuestionTextChange(e.target.value)}
          placeholder="Nhập nội dung câu hỏi hoặc chia sẻ thắc mắc... (Bạn có thể chọn ảnh/video từ máy tính của bạn hoặc chèn icon bên dưới)"
          className="w-full p-3 text-xs font-serif border border-[#d6d3d1] focus:outline-hidden focus:border-[#b91c1c] transition-colors resize-y leading-relaxed"
        />

        {/* Media Preview Box */}
        {(attachedImage || attachedVideo) && (
          <div className="p-2.5 bg-[#fafaf9] border border-[#e7e5e4] flex items-center gap-3">
            {attachedImage && (
              <div className="relative inline-block border border-[#d6d3d1] bg-white">
                <img
                  src={attachedImage}
                  alt="Preview"
                  onClick={() => onOpenMedia({ type: 'image', url: attachedImage })}
                  className="w-24 h-16 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  title="Bấm để xem ảnh phóng to"
                />
                <button
                  onClick={onRemoveAttachedImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors shadow-md z-10 cursor-pointer"
                  title="Xóa ảnh"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {attachedVideo && (
              <div className="relative inline-block">
                <div
                  onClick={() => onOpenMedia({ type: 'video', url: attachedVideo })}
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
                  className="relative cursor-pointer overflow-hidden rounded-xs border border-zinc-700 bg-black w-36 h-20 shadow-2xs group"
                  title="Rê chuột xem thử không tiếng · Bấm để phóng to"
                >
                  <video
                    src={attachedVideo}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                    <Play className="w-5 h-5 text-white fill-white/80" />
                  </div>
                </div>
                <button
                  onClick={onRemoveAttachedVideo}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#b91c1c] text-white rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors shadow-md z-10 cursor-pointer"
                  title="Xóa video"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Trạng thái upload lên Cloud */}
        {isUploadingMedia && (
          <div className="flex items-center gap-1.5 text-xs text-[#b91c1c] font-mono py-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang đồng bộ file lên Supabase Storage...</span>
          </div>
        )}

        {/* Popover Icon / Emoji */}
        {showEmojiPicker && (
          <div className="p-2.5 bg-white border border-[#e7e5e4] shadow-md flex flex-wrap gap-1.5 max-w-md animate-in fade-in zoom-in-95">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onSelectEmoji(emoji)}
                className="w-8 h-8 flex items-center justify-center text-base hover:bg-[#f5f5f4] rounded-xs transition-colors cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center border border-[#d6d3d1] bg-white">
              <button
                type="button"
                onClick={onTriggerMainImageInput}
                className="px-2.5 py-1.5 text-xs text-[#1c1917] hover:bg-[#f5f5f4] flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                title="Chọn file ảnh từ thư mục máy tính của bạn"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#b91c1c]" />
                <span>Ảnh từ máy</span>
              </button>
              <span className="w-px h-4 bg-[#e7e5e4]" />
              <button
                type="button"
                onClick={() => onOpenUrlModal('image')}
                className="px-2 py-1.5 text-xs text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4] cursor-pointer"
                title="Dán link ảnh online"
              >
                <Link className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center border border-[#d6d3d1] bg-white">
              <button
                type="button"
                onClick={onTriggerMainVideoInput}
                className="px-2.5 py-1.5 text-xs text-[#1c1917] hover:bg-[#f5f5f4] flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                title="Chọn file clip từ thư mục máy tính của bạn"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#b91c1c]" />
                <span>Video từ máy</span>
              </button>
              <span className="w-px h-4 bg-[#e7e5e4]" />
              <button
                type="button"
                onClick={() => onOpenUrlModal('video')}
                className="px-2 py-1.5 text-xs text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4] cursor-pointer"
                title="Dán link video online"
              >
                <Link className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onToggleEmojiPicker}
              className={`px-2.5 py-1.5 text-xs border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showEmojiPicker
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-[#44403c] border-[#d6d3d1] hover:border-[#1c1917]'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Icon</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onPostQuestion}
            className="px-5 py-2 bg-[#b91c1c] text-white text-xs font-mono font-bold hover:bg-[#991b1b] transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Đăng Thảo Luận</span>
          </button>
        </div>
      </div>

      {/* Danh sách các câu hỏi & luồng bình luận */}
      <div className="space-y-4">
        {discussions && discussions.length > 0 ? (
          discussions.map((d) => (
            <DiscussionThreadItem
              key={d.id}
              discussion={d}
              currentAuthorName={currentAuthorName}
              isTeacher={isTeacher}
              currentUserId={currentUserId}
              replyingToDiscussionId={replyingToDiscussionId}
              replyText={replyText}
              replyAttachedImage={replyAttachedImage}
              replyAttachedVideo={replyAttachedVideo}
              showReplyEmoji={showReplyEmoji}
              isUploadingMedia={isUploadingMedia}
              onOpenMedia={onOpenMedia}
              onLike={onLikeDiscussion}
              onToggleReply={onToggleReply}
              onRequestDelete={onRequestDeleteDiscussion}
              onReplyTextChange={onReplyTextChange}
              onRemoveReplyImage={onRemoveReplyImage}
              onRemoveReplyVideo={onRemoveReplyVideo}
              onToggleReplyEmoji={onToggleReplyEmoji}
              onSelectReplyEmoji={onSelectReplyEmoji}
              onTriggerReplyImageInput={onTriggerReplyImageInput}
              onTriggerReplyVideoInput={onTriggerReplyVideoInput}
              onSubmitReply={onSubmitReply}
            />
          ))
        ) : (
          <div className="p-8 text-center text-xs text-[#78716c] border border-dashed border-[#d6d3d1] bg-[#fafaf9]">
            Chưa có câu hỏi thảo luận nào cho bài học này. Hãy là người đầu tiên đặt câu hỏi thắc mắc nhé!
          </div>
        )}
      </div>
    </div>
  );
};

