import { useState } from 'react';
import { LoadingBar } from './LoadingBar';

interface BookImageProps {
  src: string;
  alt: string;
}

export function BookImage({ src, alt }: BookImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {!loaded && <LoadingBar label="Đang tải hình ảnh bài tập..." compact />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${loaded ? '' : 'hidden'} max-h-[420px] max-w-full object-contain rounded-none border border-[#e7e5e4] bg-white shadow-xs`}
      />
    </div>
  );
}

