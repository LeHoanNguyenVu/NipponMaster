import { useState, useRef, useCallback } from 'react';
import { grammarApi } from '../../../api/grammarApi';
import type { GrammarDiscussionDto } from '../types';

interface UseGrammarDiscussionsProps {
  currentLessonId: number;
  currentUserLevel: string;
  currentAuthorName: string;
  currentUserRole: 'teacher' | 'student';
  isTeacher: boolean;
  discussionCacheRef: React.MutableRefObject<Map<number, GrammarDiscussionDto[]>>;
}

export function useGrammarDiscussions({
  currentLessonId,
  currentUserLevel,
  currentAuthorName,
  currentUserRole,
  isTeacher,
  discussionCacheRef,
}: UseGrammarDiscussionsProps) {
  const [discussions, setDiscussions] = useState<GrammarDiscussionDto[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUrlInputModal, setShowUrlInputModal] = useState<'image' | 'video' | null>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  // Trạng thái trả lời (Reply Threading)
  const [replyingToDiscussionId, setReplyingToDiscussionId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [replyAttachedImage, setReplyAttachedImage] = useState<string | null>(null);
  const [replyAttachedVideo, setReplyAttachedVideo] = useState<string | null>(null);
  const [showReplyEmoji, setShowReplyEmoji] = useState(false);

  // Modal xác nhận xóa
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    discussionId: number;
    isReply: boolean;
    parentId?: number;
  } | null>(null);
  const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);

  // File Inputs ẩn
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const mainVideoInputRef = useRef<HTMLInputElement>(null);
  const replyImageInputRef = useRef<HTMLInputElement>(null);
  const replyVideoInputRef = useRef<HTMLInputElement>(null);

  // Upload ảnh thảo luận từ máy tính lên Supabase Storage CDN
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setAttachedImage(localUrl);

    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res && res.url) {
        setAttachedImage(res.url);
      }
    } catch (err) {
      console.warn('Upload ảnh lên Supabase thất bại, sử dụng preview:', err);
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

  const handleReplyImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setReplyAttachedImage(localUrl);

    setIsUploadingMedia(true);
    try {
      const res = await grammarApi.uploadDiscussionMedia(file);
      if (res && res.url) {
        setReplyAttachedImage(res.url);
      }
    } catch (err) {
      console.warn('Upload ảnh reply lên Supabase thất bại, sử dụng preview:', err);
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

  const handleAttachMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    if (showUrlInputModal === 'image') {
      setAttachedImage(mediaUrlInput.trim());
    } else if (showUrlInputModal === 'video') {
      setAttachedVideo(mediaUrlInput.trim());
    }
    setShowUrlInputModal(null);
    setMediaUrlInput('');
  };

  // Đăng câu hỏi thảo luận mới
  const handlePostQuestion = async () => {
    if (!questionText.trim() && !attachedImage && !attachedVideo) return;

    try {
      const created = await grammarApi.createDiscussion(currentLessonId, {
        content: questionText.trim(),
        imageUrl: attachedImage || undefined,
        videoUrl: attachedVideo || undefined,
      });
      if (created && !created.authorLevel) {
        created.authorLevel = currentUserLevel;
      }
      setDiscussions((prev) => {
        const updated = [created, ...prev];
        discussionCacheRef.current.set(currentLessonId, updated);
        return updated;
      });
    } catch (err) {
      console.warn('Lỗi đăng thảo luận API, fallback cục bộ:', err);
      const newDiscussion: GrammarDiscussionDto = {
        id: Date.now(),
        authorName: currentAuthorName,
        authorLevel: currentUserLevel,
        avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
        avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-blue-600',
        role: currentUserRole,
        isSensei: isTeacher,
        timeAgo: 'Vừa xong',
        content: questionText.trim(),
        imageUrl: attachedImage || undefined,
        videoUrl: attachedVideo || undefined,
        helpfulCount: 0,
        replies: [],
      };
      setDiscussions((prev) => {
        const updated = [newDiscussion, ...prev];
        discussionCacheRef.current.set(currentLessonId, updated);
        return updated;
      });
    }

    setQuestionText('');
    setAttachedImage(null);
    setAttachedVideo(null);
    setShowEmojiPicker(false);
  };

  // Đăng câu trả lời cho một chủ đề
  const handlePostReply = async (discussionId: number) => {
    if (!replyText.trim() && !replyAttachedImage && !replyAttachedVideo) return;

    try {
      const replyCreated = await grammarApi.createDiscussion(currentLessonId, {
        content: replyText.trim(),
        imageUrl: replyAttachedImage || undefined,
        videoUrl: replyAttachedVideo || undefined,
        replyToId: discussionId,
      });
      if (replyCreated && !replyCreated.authorLevel) {
        replyCreated.authorLevel = currentUserLevel;
      }
      setDiscussions((prev) => {
        const updated = prev.map((d) => {
          if (d.id === discussionId) {
            return {
              ...d,
              replies: [...(d.replies || []), replyCreated],
            };
          }
          return d;
        });
        discussionCacheRef.current.set(currentLessonId, updated);
        return updated;
      });
    } catch (err) {
      console.warn('Lỗi đăng phản hồi API, fallback cục bộ:', err);
      const newReply: GrammarDiscussionDto = {
        id: Date.now(),
        authorName: currentAuthorName,
        authorLevel: currentUserLevel,
        avatarLetter: currentAuthorName.charAt(0).toUpperCase() || 'U',
        avatarBg: isTeacher ? 'bg-[#b91c1c]' : 'bg-emerald-600',
        role: currentUserRole,
        isSensei: isTeacher,
        timeAgo: 'Vừa xong',
        content: replyText.trim(),
        imageUrl: replyAttachedImage || undefined,
        videoUrl: replyAttachedVideo || undefined,
        helpfulCount: 0,
        replies: [],
      };
      setDiscussions((prev) => {
        const updated = prev.map((d) => {
          if (d.id === discussionId) {
            return {
              ...d,
              replies: [...(d.replies || []), newReply],
            };
          }
          return d;
        });
        discussionCacheRef.current.set(currentLessonId, updated);
        return updated;
      });
    }

    setReplyText('');
    setReplyAttachedImage(null);
    setReplyAttachedVideo(null);
    setReplyingToDiscussionId(null);
    setShowReplyEmoji(false);
  };

  // Thả tim hữu ích
  const handleLikeDiscussion = async (id: number) => {
    try {
      await grammarApi.toggleHelpful(id);
    } catch {
      // ignore
    }
    setDiscussions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, helpfulCount: d.helpfulCount + 1 } : d))
    );
  };

  // Mở popup xác nhận xóa comment chuẩn giao diện NipponMaster
  const handleRequestDeleteDiscussion = useCallback(
    (discussionId: number, isReply: boolean = false, parentId?: number) => {
      setDeleteConfirmTarget({ discussionId, isReply, parentId });
    },
    []
  );

  // Thực thi xóa comment khi học viên xác nhận trên Modal NipponMaster
  const executeDeleteDiscussion = async () => {
    if (!deleteConfirmTarget) return;
    const { discussionId, isReply, parentId } = deleteConfirmTarget;
    setIsDeletingComment(true);

    try {
      await grammarApi.deleteDiscussion(discussionId);
      if (isReply && parentId) {
        setDiscussions((prev) => {
          const updated = prev.map((d) => {
            if (d.id === parentId) {
              return {
                ...d,
                replies: (d.replies || []).filter((r) => r.id !== discussionId),
              };
            }
            return d;
          });
          discussionCacheRef.current.set(currentLessonId, updated);
          return updated;
        });
      } else {
        setDiscussions((prev) => {
          const updated = prev.filter((d) => d.id !== discussionId);
          discussionCacheRef.current.set(currentLessonId, updated);
          return updated;
        });
      }
    } catch (err) {
      console.warn('Lỗi khi gọi API xóa thảo luận, xóa cục bộ giao diện:', err);
      if (isReply && parentId) {
        setDiscussions((prev) => {
          const updated = prev.map((d) => {
            if (d.id === parentId) {
              return {
                ...d,
                replies: (d.replies || []).filter((r) => r.id !== discussionId),
              };
            }
            return d;
          });
          discussionCacheRef.current.set(currentLessonId, updated);
          return updated;
        });
      } else {
        setDiscussions((prev) => {
          const updated = prev.filter((d) => d.id !== discussionId);
          discussionCacheRef.current.set(currentLessonId, updated);
          return updated;
        });
      }
    } finally {
      setIsDeletingComment(false);
      setDeleteConfirmTarget(null);
    }
  };

  return {
    discussions,
    setDiscussions,
    questionText,
    setQuestionText,
    attachedImage,
    setAttachedImage,
    attachedVideo,
    setAttachedVideo,
    showEmojiPicker,
    setShowEmojiPicker,
    showUrlInputModal,
    setShowUrlInputModal,
    mediaUrlInput,
    setMediaUrlInput,
    replyingToDiscussionId,
    setReplyingToDiscussionId,
    replyText,
    setReplyText,
    replyAttachedImage,
    setReplyAttachedImage,
    replyAttachedVideo,
    setReplyAttachedVideo,
    showReplyEmoji,
    setShowReplyEmoji,
    deleteConfirmTarget,
    setDeleteConfirmTarget,
    isDeletingComment,
    isUploadingMedia,
    mainImageInputRef,
    mainVideoInputRef,
    replyImageInputRef,
    replyVideoInputRef,
    handleMainImageChange,
    handleMainVideoChange,
    handleReplyImageChange,
    handleReplyVideoChange,
    handleAttachMediaUrl,
    handlePostQuestion,
    handlePostReply,
    handleLikeDiscussion,
    handleRequestDeleteDiscussion,
    executeDeleteDiscussion,
  };
}

