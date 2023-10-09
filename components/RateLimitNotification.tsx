import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { RateLimitState } from 'hooks/useRateLimit';
import { convertSecondsToHHMMSS } from 'libs/utils';

interface RateLimitNotificationProps {
  rateLimitState: RateLimitState;
  rateType: 'rate' | 'codeSearch';
}

function RateLimitNotification({ rateLimitState, rateType }: RateLimitNotificationProps) {
  const { reset, remaining } = rateLimitState[rateType];
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (reset === undefined) return () => { };
    setCountdown(reset);
    const interval = setInterval(() => {
      setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [reset]);

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
