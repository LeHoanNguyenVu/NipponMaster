import React, { useRef, useState } from 'react';
import {
  CornerDownRight,
  FolderOpen,
  Link,
  Loader2,
  MessageSquare,
  Play,
  Send,
  Smile,
  ThumbsUp,
  Trash2,
  X,
} from 'lucide-react';
import { grammarApi } from '../../../api/grammarApi';
import { DeleteCommentConfirmModal } from '../../grammar/modals/DeleteCommentConfirmModal';
import { MediaLightboxModal } from '../../grammar/modals/MediaLightboxModal';
import { UrlInputModal } from '../../grammar/modals/UrlInputModal';
import type { ExamComment, ExamCommentReply, LightboxMedia } from '../types';
import { EMOJI_LIST } from '../types';

interface ExamDiscussionTabProps {
  examId: string;
  comments: ExamComment[];
  currentUserId?: string | number;
  currentAuthorName: string;
  currentUserLevel: string;
  currentUserRole: 'teacher' | 'student';
  isTeacher: boolean;
  onPostComment: (comment: ExamComment) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string, reply: ExamCommentReply) => void;
  onDeleteComment: (commentId: string, isReply?: boolean, parentId?: string) => void;
}

export const ExamDiscussionTab: React.FC<ExamDiscussionTabProps> = ({
  examId,
  comments,
  currentUserId,
  currentAuthorName,
  currentUserLevel,
  currentUserRole,
  isTeacher,
  onPostComment,
  onLikeComment,
  onReplyComment,
  onDeleteComment,
}) => {
  // Main form states
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Reply states
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAttachedImage, setReplyAttachedImage] = useState<string | null>(null);
  const [replyAttachedVideo, setReplyAttachedVideo] = useState<string | null>(null);
  const [showReplyEmoji, setShowReplyEmoji] = useState(false);

  // Modal states
  const [showUrlModal, setShowUrlModal] = useState<'image' | 'video' | null>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [urlModalTarget, setUrlModalTarget] = useState<'main' | 'reply'>('main');
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<LightboxMedia | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    isReply: boolean;
    parentId?: string;
  } | null>(null);

  // Hidden File Inputs
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const mainVideoInputRef = useRef<HTMLInputElement>(null);
  const replyImageInputRef = useRef<HTMLInputElement>(null);
  const replyVideoInputRef = useRef<HTMLInputElement>(null);

  // Handle Main Media File Input
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setAttachedImage(localUrl);
    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res?.url) {
        setAttachedImage(res.url);
      }
    } catch {
      // Fall back to local object URL
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleMainVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setAttachedVideo(localUrl);
    }
  };

  // Handle Reply Media File Input
  const handleReplyImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setReplyAttachedImage(localUrl);
    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res?.url) {
        setReplyAttachedImage(res.url);
      }
    } catch {
      // Fall back to local object URL
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleReplyVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setReplyAttachedVideo(localUrl);
    }
  };

  // Handle URL Confirmation
  const handleConfirmUrl = () => {
    if (!mediaUrlInput.trim()) return;
    if (urlModalTarget === 'main') {
      if (showUrlModal === 'image') setAttachedImage(mediaUrlInput.trim());
      else if (showUrlModal === 'video') setAttachedVideo(mediaUrlInput.trim());
    } else {
      if (showUrlModal === 'image') setReplyAttachedImage(mediaUrlInput.trim());
      else if (showUrlModal === 'video') setReplyAttachedVideo(mediaUrlInput.trim());
    }
    setMediaUrlInput('');
    setShowUrlModal(null);
  };

  // Handle Submit Main Post
  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedImage && !attachedVideo) return;

    const newComment: ExamComment = {
      id: `ec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      examId,
      userId: currentUserId,
      author: currentAuthorName,
      role: currentUserRole,
      level: currentUserLevel,
      content: inputText.trim(),
      attachedImage,
      attachedVideo,
      likes: 0,
      userLiked: false,
      replies: [],
      createdAt: 'Vừa xong',
    };

    onPostComment(newComment);
    setInputText('');
    setAttachedImage(null);
    setAttachedVideo(null);
    setShowEmojiPicker(false);
  };

  // Handle Submit Reply
  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim() && !replyAttachedImage && !replyAttachedVideo) return;

    const newReply: ExamCommentReply = {
      id: `er_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      commentId,
      author: currentAuthorName,
      role: currentUserRole,
      content: replyText.trim(),
      attachedImage: replyAttachedImage,
      attachedVideo: replyAttachedVideo,
      createdAt: 'Vừa xong',
    };

    onReplyComment(commentId, newReply);
    setReplyingToCommentId(null);
    setReplyText('');
    setReplyAttachedImage(null);
    setReplyAttachedVideo(null);
    setShowReplyEmoji(false);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs */}
      <input
        ref={mainImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleMainImageChange}
      />
      <input
        ref={mainVideoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleMainVideoChange}
      />
      <input
        ref={replyImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleReplyImageChange}
      />
      <input
        ref={replyVideoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleReplyVideoChange}
      />

      {/* Main Comment Box (Washi Editorial Styled) */}
      <div className="p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span className="font-bold text-on-surface flex items-center gap-1.5 uppercase">
            <MessageSquare size={15} className="text-primary" />
            Thảo luận & Giải đáp thắc mắc đề thi:
          </span>
          <span className="text-[11px]">
            Đang đăng: <strong className="text-on-surface">{currentAuthorName}</strong> (
            {currentUserRole === 'teacher' ? 'Giảng viên' : `Học viên ${currentUserLevel}`})
          </span>
        </div>

        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập nội dung chia sẻ, kinh nghiệm giải đề hoặc thắc mắc câu hỏi... (Bạn có thể đính kèm ảnh, video hoặc icon bên dưới)"
          className="w-full p-3 text-xs sm:text-sm font-sans rounded-lg border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-hidden focus:border-primary transition-colors resize-y leading-relaxed"
        />

        {/* Media Preview Box */}
        {(attachedImage || attachedVideo) && (
          <div className="p-2.5 bg-surface-container border border-outline-variant/30 rounded-lg flex items-center gap-3">
            {attachedImage && (
              <div className="relative inline-block border border-outline-variant/40 rounded overflow-hidden">
                <img
                  src={attachedImage}
                  alt="Xem thử"
                  onClick={() => setActiveLightboxMedia({ type: 'image', url: attachedImage })}
                  className="w-24 h-16 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  title="Bấm để xem ảnh phóng to"
                />
                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-on-error rounded-full flex items-center justify-center text-xs hover:opacity-90 transition-colors shadow-md z-10 cursor-pointer"
                  title="Xóa ảnh"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {attachedVideo && (
              <div className="relative inline-block border border-outline-variant/40 rounded overflow-hidden">
                <div
                  onClick={() => setActiveLightboxMedia({ type: 'video', url: attachedVideo })}
                  className="relative cursor-pointer overflow-hidden rounded bg-black w-32 h-18 shadow-2xs group flex items-center justify-center"
                  title="Bấm để phát video phóng to"
                >
                  <video
                    src={attachedVideo}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    <Play className="w-6 h-6 text-white drop-shadow-md" fill="white" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedVideo(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-on-error rounded-full flex items-center justify-center text-xs hover:opacity-90 transition-colors shadow-md z-10 cursor-pointer"
                  title="Xóa video"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Emoji Picker Dropdown */}
        {showEmojiPicker && (
          <div className="p-2.5 bg-surface-container-low border border-outline-variant/30 rounded-lg flex flex-wrap gap-2 animate-in fade-in duration-100">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setInputText((prev) => prev + emoji);
                  setShowEmojiPicker(false);
                }}
                className="w-8 h-8 rounded hover:bg-surface-container-high flex items-center justify-center text-base hover:scale-110 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={isUploadingMedia}
              onClick={() => mainImageInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Chọn file ảnh từ máy tính"
            >
              <FolderOpen size={14} className="text-secondary" />
              <span>Ảnh</span>
            </button>

            <button
              type="button"
              disabled={isUploadingMedia}
              onClick={() => mainVideoInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Chọn file video từ máy tính"
            >
              <Play size={14} className="text-primary" />
              <span>Video</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUrlModalTarget('main');
                setShowUrlModal('image');
              }}
              className="px-2.5 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Nhập URL ảnh hoặc video trực tiếp"
            >
              <Link size={14} className="text-primary" />
              <span>Link URL</span>
            </button>

            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                showEmojiPicker
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              title="Chọn biểu tượng cảm xúc"
            >
              <Smile size={14} />
              <span>Icon</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePost}
            disabled={isUploadingMedia || (!inputText.trim() && !attachedImage && !attachedVideo)}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 hover:opacity-95 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploadingMedia ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            <span>Đăng thảo luận</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="py-12 px-4 text-center border border-dashed border-outline-variant/40 rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shadow-xs">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="text-sm font-bold text-on-surface">
              Chưa có thảo luận nào cho đề thi này
            </div>
            <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
              Hãy là người đầu tiên đặt câu hỏi về cấu trúc đề, chia sẻ kinh nghiệm giải nhanh hoặc phân tích những câu khó!
            </p>
          </div>
        ) : (
          comments.map((item) => {
            const isAuthor =
              currentUserId && item.userId
                ? String(item.userId) === String(currentUserId)
                : item.author === currentAuthorName;
            const canDelete = isAuthor || isTeacher;
            const isReplying = replyingToCommentId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3"
              >
                {/* Header: Author + Role + Level + Time */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center uppercase">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface">{item.author}</span>
                        <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary text-[10px] font-bold">
                          {item.role === 'teacher' ? 'Giảng viên' : item.level || 'JLPT'}
                        </span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant block">
                        {item.createdAt}
                      </span>
                    </div>
                  </div>

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => setDeleteTarget({ id: item.id, isReply: false })}
                      className="text-on-surface-variant hover:text-error p-1 rounded transition-colors cursor-pointer"
                      title="Xóa bình luận này"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>

                {/* Attached Media */}
                {item.attachedImage && (
                  <div className="pt-1">
                    <img
                      src={item.attachedImage}
                      alt="Đính kèm"
                      onClick={() =>
                        setActiveLightboxMedia({ type: 'image', url: item.attachedImage! })
                      }
                      className="max-h-56 max-w-sm rounded-lg object-cover border border-outline-variant/30 cursor-pointer hover:opacity-95 transition-opacity"
                      title="Bấm để phóng to"
                    />
                  </div>
                )}

                {item.attachedVideo && (
                  <div className="pt-1">
                    <div
                      onClick={() =>
                        setActiveLightboxMedia({ type: 'video', url: item.attachedVideo! })
                      }
                      className="relative cursor-pointer max-w-sm rounded-lg overflow-hidden border border-outline-variant/30 bg-black aspect-video flex items-center justify-center group"
                      title="Bấm để phát video"
                    >
                      <video
                        src={item.attachedVideo}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Actions: Like & Reply */}
                <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20 text-xs">
                  <button
                    type="button"
                    onClick={() => onLikeComment(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      item.userLiked
                        ? 'bg-primary/15 text-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <ThumbsUp size={13} />
                    <span>{item.likes || 0}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReplyingToCommentId((prev) => (prev === item.id ? null : item.id));
                      setReplyText('');
                      setReplyAttachedImage(null);
                      setReplyAttachedVideo(null);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      isReplying
                        ? 'bg-secondary/15 text-secondary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <CornerDownRight size={13} />
                    <span>Trả lời {item.replies && item.replies.length > 0 && `(${item.replies.length})`}</span>
                  </button>
                </div>

                {/* Inline Reply Box */}
                {isReplying && (
                  <div className="mt-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 space-y-2 animate-in fade-in duration-100">
                    <div className="text-[11px] font-bold text-on-surface-variant">
                      Trả lời <span className="text-primary">{item.author}</span>:
                    </div>

                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Nhập nội dung phản hồi..."
                      className="w-full p-2.5 text-xs rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface focus:outline-hidden focus:border-primary transition-colors resize-y leading-relaxed"
                    />

                    {/* Reply Media Previews */}
                    {(replyAttachedImage || replyAttachedVideo) && (
                      <div className="p-2 bg-surface-container border border-outline-variant/30 rounded flex items-center gap-2">
                        {replyAttachedImage && (
                          <div className="relative inline-block border border-outline-variant/30 rounded overflow-hidden">
                            <img
                              src={replyAttachedImage}
                              alt="Xem thử"
                              className="w-16 h-12 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setReplyAttachedImage(null)}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center text-[10px]"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                        {replyAttachedVideo && (
                          <div className="relative inline-block border border-outline-variant/30 rounded overflow-hidden">
                            <video
                              src={replyAttachedVideo}
                              className="w-16 h-12 object-cover bg-black"
                            />
                            <button
                              type="button"
                              onClick={() => setReplyAttachedVideo(null)}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center text-[10px]"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Reply Emoji Picker */}
                    {showReplyEmoji && (
                      <div className="p-2 bg-surface-container-lowest border border-outline-variant/30 rounded flex flex-wrap gap-1.5">
                        {EMOJI_LIST.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setReplyText((prev) => prev + emoji);
                              setShowReplyEmoji(false);
                            }}
                            className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-sm cursor-pointer"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reply Toolbar */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => replyImageInputRef.current?.click()}
                          className="px-2 py-1 rounded border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <FolderOpen size={12} className="text-secondary" />
                          <span>Ảnh</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => replyVideoInputRef.current?.click()}
                          className="px-2 py-1 rounded border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Play size={12} className="text-primary" />
                          <span>Video</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUrlModalTarget('reply');
                            setShowUrlModal('image');
                          }}
                          className="px-2 py-1 rounded border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Link size={12} className="text-primary" />
                          <span>URL</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReplyEmoji((prev) => !prev)}
                          className="px-2 py-1 rounded border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Smile size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSubmitReply(item.id)}
                        disabled={!replyText.trim() && !replyAttachedImage && !replyAttachedVideo}
                        className="px-3 py-1.5 rounded bg-primary text-on-primary text-xs font-bold flex items-center gap-1 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Send size={12} />
                        <span>Gửi phản hồi</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Replies Thread */}
                {item.replies && item.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-primary/20 space-y-2.5">
                    {item.replies.map((reply) => {
                      const canDeleteReply =
                        (currentUserId && reply.author === currentAuthorName) || isTeacher;
                      return (
                        <div
                          key={reply.id}
                          className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-on-surface">{reply.author}</span>
                              <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant text-[10px]">
                                {reply.role === 'teacher' ? 'Giảng viên' : 'Học viên'}
                              </span>
                              <span className="text-[10px] text-on-surface-variant">
                                {reply.createdAt}
                              </span>
                            </div>

                            {canDeleteReply && (
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteTarget({
                                    id: reply.id,
                                    isReply: true,
                                    parentId: item.id,
                                  })
                                }
                                className="text-on-surface-variant hover:text-error p-0.5 rounded cursor-pointer"
                                title="Xóa câu trả lời"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>

                          <p className="text-xs text-on-surface leading-relaxed whitespace-pre-wrap">
                            {reply.content}
                          </p>

                          {reply.attachedImage && (
                            <img
                              src={reply.attachedImage}
                              alt="Đính kèm reply"
                              onClick={() =>
                                setActiveLightboxMedia({
                                  type: 'image',
                                  url: reply.attachedImage!,
                                })
                              }
                              className="max-h-40 max-w-xs rounded object-cover cursor-pointer hover:opacity-90"
                            />
                          )}

                          {reply.attachedVideo && (
                            <div
                              onClick={() =>
                                setActiveLightboxMedia({
                                  type: 'video',
                                  url: reply.attachedVideo!,
                                })
                              }
                              className="relative cursor-pointer max-w-xs rounded overflow-hidden bg-black aspect-video flex items-center justify-center"
                            >
                              <video
                                src={reply.attachedVideo}
                                controls
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Media Lightbox Modal */}
      <MediaLightboxModal
        activeLightboxMedia={activeLightboxMedia}
        onClose={() => setActiveLightboxMedia(null)}
      />

      {/* URL Input Modal */}
      <UrlInputModal
        showUrlInputModal={showUrlModal}
        mediaUrlInput={mediaUrlInput}
        onUrlChange={setMediaUrlInput}
        onConfirm={handleConfirmUrl}
        onClose={() => {
          setShowUrlModal(null);
          setMediaUrlInput('');
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCommentConfirmModal
        deleteConfirmTarget={
          deleteTarget
            ? {
                discussionId: Number(deleteTarget.id.replace(/\D/g, '') || 1),
                isReply: deleteTarget.isReply,
                parentId: deleteTarget.parentId
                  ? Number(deleteTarget.parentId.replace(/\D/g, '') || 1)
                  : undefined,
              }
            : null
        }
        isDeletingComment={false}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onDeleteComment(deleteTarget.id, deleteTarget.isReply, deleteTarget.parentId);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
};

