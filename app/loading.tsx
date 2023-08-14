'use client';

import { BiLoaderAlt } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <div className={twMerge('flex h-full items-center justify-center', className)}>
      <div className="flex items-center gap-x-2">
        <BiLoaderAlt className="animate-spin text-3xl" />
        <p className="text-2xl text-neutral-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;
