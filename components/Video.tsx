import React, { useRef, useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface VideoProps {
  src: string
}

function Video({ src }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      await videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative my-4 w-full">
      <button
        type="button"
        className={twMerge(
          'absolute inset-0 z-20 flex items-center justify-center hover:brightness-125',
          isPlaying ? 'bg-transparent' : 'bg-secondary/90',
        )}
        onClick={handlePlay}
      >
        <div
          className={twMerge(
            `flex items-center justify-center rounded-full border-2 border-text-secondary
          bg-secondary p-2 hover:brightness-125`,
            isPlaying ? 'hidden' : 'visible',
          )}
        >
          <BiPlay size={64} className="translate-x-[2px]" />
        </div>
      </button>
      <video
        src={src}
        ref={videoRef}
        className="w-full"
        muted
        controls
        loop
      />
    </div>
  );
}

export default Video;
