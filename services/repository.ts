import axios from 'axios';

import type { Repository } from 'app/api/repository/route';

const getRepository = async () => {
  try {
    const { data } = await axios.get<Repository>('/api/repository');
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getRepository;
