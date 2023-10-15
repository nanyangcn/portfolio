import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useRateLimitStore from 'hooks/useRateLimitStore';
import { convertSecondsToHHMMSS } from 'libs/utils';

interface RateLimitNotificationProps {
  rateType: 'rate' | 'codeSearch';
}

function RateLimitNotification({ rateType }: RateLimitNotificationProps) {
  const { rateLimitState, updateRateLimitState } = useRateLimitStore();
  const { reset, remaining } = rateLimitState[rateType];
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (reset === undefined) return () => { };
    setCountdown(reset);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      updateRateLimitState().catch(() => { });
    }, reset * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reset, rateLimitState, updateRateLimitState]);

  if (remaining === undefined) return null;

  return (
    <div
      className="flex justify-between gap-x-4 border-y-2 border-border-primary px-8 py-2"
    >
      <p
        className={twMerge(
          'whitespace-nowrap font-mono text-sm',
          remaining && remaining < 3 ? 'text-red-500' : '',
        )}
      >
        {`Remain:${remaining}`}
      </p>
      <p className="whitespace-nowrap font-mono text-sm">
        {`Reset:${convertSecondsToHHMMSS(countdown)}`}
      </p>
    </div>
  );
}

export default RateLimitNotification;
