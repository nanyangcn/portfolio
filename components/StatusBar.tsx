'use client';

import { useEffect, useState } from 'react';
import getRateLimit, { RateLimit } from 'actions/getRateLimit';
import { dataToLocaleTimeString } from 'libs/utils';

type Rate = Pick<RateLimit['rate'], 'remaining' | 'reset'>;

function StatusBar() {
  const [rate, setRate] = useState<Rate>({
    remaining: 0,
    reset: 0,
  });

  useEffect(() => {
    const getAndSetRate = async () => {
      const { rate: rateData } = await getRateLimit();
      setRate(rateData);
    };

    getAndSetRate().catch(() => { });
    const interval = setInterval(async () => {
      await getAndSetRate();
    }, 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="flex w-full flex-none items-center divide-x-2
      border-t-[1px] border-border-primary bg-secondary px-8 py-0.5 text-sm"
    >
      <div className="inline-flex items-center px-4">
        <p className="pr-2">Rate Limit:</p>
        <p className="pr-6 font-semibold">{rate.remaining}</p>
        <p className="pr-2">Reset At:</p>
        <p className="font-semibold">{dataToLocaleTimeString(rate.reset)}</p>
      </div>
    </div>
  );
}

export default StatusBar;
