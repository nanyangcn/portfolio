import axios from 'axios';

import type { RepoBlob } from 'app/api/repository/blob/route';

const getRepoBlob = async (owner: string, repo: string, sha: string) => {
  try {
    const { data } = await axios.get<RepoBlob>(
      '/api/repository/blob',
      {
        params: {
          owner,
          repo,
          sha,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getRepoBlob;
