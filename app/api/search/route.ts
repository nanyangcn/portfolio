import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { NextRequest, NextResponse } from 'next/server';

import worksMeta from 'data/worksMeta';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN ?? '',
});

export type SearchCodeResults = Endpoints['GET /search/code']['response']['data'];

const repoList = worksMeta.map((workMeta) => `${workMeta.subtitle}/${workMeta.title.toLowerCase()}`);

const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get('keyword');
  if (!keyword || keyword === '') {
    return NextResponse.json('Illegal Keyword', { status: 404 });
  }
  const repo = searchParams.get('repo');
  if (!repo || !repoList.includes(repo)) {
    return NextResponse.json('Illegal Repo Name', { status: 404 });
  }

  const q = `"${keyword}" in:file repo:${repo}`;
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
