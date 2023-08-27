export interface WorkMeta {
  title: string;
  author: string;
  description: string;
  icon: string;
  tags: string[];
  source: string;
  deployment: string;
  features?: {
    title?: string;
    description?: string;
    image?: string;
  } []
}

const portfolio: WorkMeta = {
  title: 'Portfolio',
  description: 'This is a portfolio web app which can also check the code from Github.',
  author: 'nanyangcn',
  icon: '/avatar.jpeg',
  tags: ['NextJS', 'Tailwindcss', 'Typescript', 'React'],
  source: 'https://github.com/nanyangcn/portfolio',
  deployment: 'https://nanyangcn.github.io/portfolio/',
  features: [
    {
      title: 'Personal Introduction',
      description: 'Explore a comprehensive presentation of developer\'s information.',
      image: '/avatar.jpeg',
    },
    {
      title: "Developer's Projects",
      description: 'Discover a variety of web projects accompanied by detailed insights.',
      image: '/avatar.jpeg',
    },
    {
      title: 'Code Review',
      description: `Experience code examination featuring syntax highlights,
      tabs, and organized folders, just like in a code editor.`,
      image: '/avatar.jpeg',
    },
    {
      title: 'Effortless Search',
      description: ' Easily find code sections with keywords.',
      image: '/avatar.jpeg',
    },
    {
      title: 'VSCode-Inspired Interface',
      description: 'Visual Studio Code inspired interface, with a resizable and hideable sidebar.',
      image: '/avatar.jpeg',
    },
  ],
};

const spotifyClone: WorkMeta = {
  title: 'Spotify-Clone',
  description: 'A basic clone of Spotify which can upload and play musics.',
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
