import axios from 'axios';

import type { RepoTree } from 'app/api/repository/tree/route';

const getRepository = async (owner: string, repo: string, sha: string) => {
  try {
    const { data } = await axios.get<RepoTree>(
      '/api/repository/tree',
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

export default getRepository;
