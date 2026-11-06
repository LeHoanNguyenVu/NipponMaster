import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { LightboxMedia } from '../types';

interface MediaLightboxModalProps {
  activeLightboxMedia: LightboxMedia | null;
  onClose: () => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({
  activeLightboxMedia,
  onClose,
}) => {
  if (!activeLightboxMedia) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[100000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl border border-white/20 hover:scale-105"
        title="Đóng (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {activeLightboxMedia.type === 'image' ? (
          <div className="flex flex-col items-center max-w-full max-h-[85vh]">
            <img
              src={activeLightboxMedia.url}
              alt="Xem ảnh phóng to"
              className="max-w-full max-h-[82vh] object-contain rounded shadow-2xl bg-black"
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center">
            <div className="aspect-video w-full bg-black rounded overflow-hidden shadow-2xl">
              <video
                src={activeLightboxMedia.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

