'use server';

import { Endpoints } from '@octokit/types';

export type RateLimit = Endpoints['GET /rate_limit']['response']['data'];

const getRateLimit = async () => {
  try {
    const url = 'https://api.github.com/rate_limit';
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN ?? ''}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 0 },
    });
    const data = await res.json() as RateLimit;

    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getRateLimit;
