import axios from 'axios';

import type { Repository } from 'app/api/repository/route';

const getRepository = async (owner: string, repo: string) => {
  try {
    const { data } = await axios.get<Repository>(
      '/api/repository',
      {
        params: {
          owner,
          repo,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getRepository;
