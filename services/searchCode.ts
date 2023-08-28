import axios from 'axios';

import type { SearchCodeResults } from 'app/api/search/route';

const getSearchCode = async (keyword: string, repo: string) => {
  try {
    const { data } = await axios.get<SearchCodeResults>(
      '/api/search',
      {
        params: {
          keyword,
          repo,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getSearchCode;
