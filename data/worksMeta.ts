export interface WorkMeta {
  title: string;
  author: string;
  description: string;
  icon: string;
  tags: string[];
  source: string;
  deployment: string;
}

const portfolio: WorkMeta = {
  title: 'Portfolio',
  description: 'This is a portfolio web app which can also check the code from Github.',
  author: 'nanyangcn',
  icon: '/avatar.jpeg',
  tags: ['NextJS', 'Tailwindcss', 'Typescript', 'React'],
  source: 'https://github.com/nanyangcn/portfolio',
  deployment: 'https://nanyangcn.github.io/portfolio/',
};

const spotifyClone: WorkMeta = {
  title: 'Spotify-Clone',
  description: 'A basic clone of Spotify which can upload and play musics',
  author: 'nanyangcn',
  icon: '/avatar.jpeg',
  tags: ['NextJS', 'Tailwindcss', 'Typescript', 'React', 'Supabase', 'Stripe'],
  source: 'https://github.com/nanyangcn/spotify-clone',
  deployment: 'https://spotify-clone-delta-weld.vercel.app/',
};

const worksMeta: WorkMeta[] = [
  portfolio,
  spotifyClone,
];

export default worksMeta;
