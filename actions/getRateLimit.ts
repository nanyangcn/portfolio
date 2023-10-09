'use server';

import { Endpoints } from '@octokit/types';
import { calcTimeDiffFromNowInSec } from 'libs/utils';

export type RateLimit = Endpoints['GET /rate_limit']['response']['data'];

type ResourcesWithCodeSearch = RateLimit['resources'] & {
  code_search: {
    remaining: number;
    reset: number;
  };
};

const getRateLimit = async () => {
  try {
    const url = 'https://api.github.com/rate_limit';
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    const headersWithAuth = {
      ...headers,
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN_SEARCH ?? ''}`,
    };
    const rateRes = await fetch(url, {
      method: 'GET',
      headers: process.env.GITHUB_API_TOKEN && process.env.GITHUB_API_TOKEN !== ''
        ? {
          ...headers,
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        }
        : headers,
      next: { revalidate: 0 },
    });
    const codeSearchRes = await fetch(url, {
      method: 'GET',
      headers: headersWithAuth,
      next: { revalidate: 0 },
    });
    const rateData = await rateRes.json() as RateLimit;
    const codeSearchData = await codeSearchRes.json() as RateLimit;

    const resourcesWithCodeSearch = codeSearchData.resources as ResourcesWithCodeSearch;
    const codeSearch = resourcesWithCodeSearch.code_search;
    const rateLimit = {
      rate: {
        remaining: rateData.rate.remaining,
        reset: calcTimeDiffFromNowInSec(rateData.rate.reset),
      },
      codeSearch: {
        remaining: codeSearch.remaining,
        reset: calcTimeDiffFromNowInSec(codeSearch.reset),
      },
    };

    return rateLimit;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getRateLimit;
