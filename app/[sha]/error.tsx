'use client';

import { BiErrorCircle } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface ErrorProps {
  className?: string;
  message?: string;
}

function Error({ className, message }: ErrorProps) {
  return (
    <div className={twMerge('flex h-full items-center justify-center', className)}>
      <div className="flex items-center gap-x-2">
        <BiErrorCircle className="text-3xl text-error" />
        <p className="text-2xl text-text-primary">
          {message ?? 'Something went wrong.'}
        </p>
      </div>
    </div>
  );
}

export default Error;
