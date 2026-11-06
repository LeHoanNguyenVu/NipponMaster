import { useState, useEffect, useRef, useCallback } from 'react';

export function useKanjiIllustrationModal() {
  const [showIllustrationModal, setShowIllustrationModal] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>('');
  const [modalImageTitle, setModalImageTitle] = useState<string>('');

  // Thu phóng & Di chuyển tranh tượng hình trong Modal
  const [modalZoom, setModalZoom] = useState<number>(1);
  const [modalPan, setModalPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [modalDragging, setModalDragging] = useState<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedDistance = useRef<number>(0);

  // Khóa cuộn toàn bộ trang (body, html, main container) khi mở Modal tranh tượng hình
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (showIllustrationModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (mainEl) mainEl.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (mainEl) mainEl.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (mainEl) mainEl.style.overflow = '';
    };
  }, [showIllustrationModal]);

  const handleCloseModal = useCallback(() => {
    setShowIllustrationModal(false);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
    setModalDragging(false);
  }, []);

  const handleOpenModal = useCallback((url: string, title: string) => {
    setModalImageUrl(url);
    setModalImageTitle(title);
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
    setModalDragging(false);
    setShowIllustrationModal(true);
  }, []);

  // Hỗ trợ phím ESC để thoát modal
  useEffect(() => {
    if (!showIllustrationModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIllustrationModal, handleCloseModal]);

  const handleModalWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      // Cuộn lên -> Phóng to
      setModalZoom((prev) => Math.min(prev + 0.25, 4.0));
    } else {
      // Cuộn xuống -> Thu nhỏ
      setModalZoom((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setModalPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setModalDragging(true);
      dragStartPos.current = {
        x: e.clientX - modalPan.x,
        y: e.clientY - modalPan.y,
      };
      hasMovedDistance.current = 0;
    }
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!modalDragging) return;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    hasMovedDistance.current += Math.abs(newX - modalPan.x) + Math.abs(newY - modalPan.y);
    setModalPan({ x: newX, y: newY });
  };

  const handleImageMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setModalDragging(false);
      // Nếu di chuột dưới 6px, xem như click trái -> Phóng to (Zoom In)
      if (hasMovedDistance.current < 6) {
        setModalZoom((prev) => Math.min(prev + 0.5, 4.0));
      }
    }
  };

  const handleImageContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Click chuột phải -> Thu nhỏ (Zoom Out)
    setModalZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setModalPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const zoomIn = () => setModalZoom((prev) => Math.min(prev + 0.5, 4.0));
  const zoomOut = () =>
    setModalZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setModalPan({ x: 0, y: 0 });
      return next;
    });
  const resetZoom = () => {
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
  };

  return {
    showIllustrationModal,
    modalImageUrl,
    modalImageTitle,
    modalZoom,
    modalPan,
    modalDragging,
    handleOpenModal,
    handleCloseModal,
    handleModalWheel,
    handleImageMouseDown,
    handleImageMouseMove,
    handleImageMouseUp,
    handleImageContextMenu,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}

