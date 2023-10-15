import { create } from 'zustand';

import getRateLimit from 'actions/getRateLimit';

interface Rate {
  remaining?: number;
  reset?: number;
}

export interface RateLimitState {
  rate: Rate
  codeSearch: Rate
}

interface RateLimitStore {
  rateLimitState: RateLimitState;
  updateRateLimitState: () => Promise<void>;
}

const useRateLimitStore = create<RateLimitStore>((set) => ({
  rateLimitState: {
    rate: {
      remaining: undefined,
      reset: undefined,
    },
    codeSearch: {
      remaining: undefined,
      reset: undefined,
    },
  },
  updateRateLimitState: async () => {
    try {
      const rateLimit = await getRateLimit();
      set({ rateLimitState: rateLimit });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
}));

export default useRateLimitStore;
