import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { NextRequest, NextResponse } from 'next/server';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN ?? '',
});

export type RepoTree = Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data'];
export type RepoBlob = Endpoints['GET /repos/{owner}/{repo}/git/blobs/{file_sha}']['response']['data'];

const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const owner = searchParams.get('owner') ?? 'nanyangcn';
  const repo = searchParams.get('repo') ?? 'portfolio';
  const treeSha = searchParams.get('sha') ?? 'main';

  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
      {
        owner,
        repo,
        tree_sha: treeSha,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
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
