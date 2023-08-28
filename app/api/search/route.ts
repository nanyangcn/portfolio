import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { NextRequest, NextResponse } from 'next/server';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN ?? '',
});

export type SearchCodeResults = Endpoints['GET /search/code']['response']['data'];

const repoList = [
  'nanyangcn/portfolio',
  'nanyangcn/spotify-clone',
];

const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get('keyword');
  if (!keyword || keyword === '') {
    return NextResponse.json('No Keyword', { status: 404 });
  }
  const repo = searchParams.get('repo');
  const repoParam = (repo && repoList.includes(repo))
    ? `repo:${repo}`
    : `${repoList.map((repoItem) => `repo:${repoItem}`).join(' OR ')}`;
  const q = `"${keyword}" in:file ${repoParam}`;
  try {
    const { data } = await octokit.request(
      'GET /search/code',
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          accept: 'application/vnd.github.text-match+json',
        },
        q,
      },
    );

    return NextResponse.json(data);
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export {
  GET,
};
