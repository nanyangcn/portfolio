import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
import { NextResponse } from 'next/server';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN ?? '',
});

export type Repository = Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

const GET = async (req: Request) => {
  const owner = 'nanyangcn';
  const repo = 'portfolio';
  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}',
      {
        owner,
        repo,
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
