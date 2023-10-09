import { useState } from 'react';

import getRateLimit from 'actions/getRateLimit';

interface Rate {
  remaining?: number;
  reset?: number;
}

export interface RateLimitState {
  rate: Rate
  codeSearch: Rate
}

const useRateLimit = () => {
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({
    rate: {
      remaining: undefined,
      reset: undefined,
    },
    codeSearch: {
      remaining: undefined,
      reset: undefined,
    },
  });
  console.log('rateLimitState:', rateLimitState);

  const updateRateLimit = async () => {
    try {
      const rateLimit = await getRateLimit();
      setRateLimitState(rateLimit);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return {
    rateLimitState,
    updateRateLimit,
  };
};

export default useRateLimit;
