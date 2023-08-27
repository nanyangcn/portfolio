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
  features: [
    {
      title: 'Interactive Player',
      description: 'Control playback progress and adjust volume easily.',
      image: '/avatar.jpeg',
    },
    {
      title: 'Authentication',
      description: 'Log in with Google or email.',
      image: '/avatar.jpeg',
    },
    {
      title: 'Subscription Management',
      description: 'Handle music memberships effortlessly',
      image: '/avatar.jpeg',
    },
    {
      title: 'Library and Liked List',
      description: 'Build own library and liked list.',
      image: '/avatar.jpeg',
    },
    {
      title: 'Find Your Beat',
      description: 'Search easily any music.',
      image: '/avatar.jpeg',
    },
  ],
};

const worksMeta: WorkMeta[] = [
  portfolio,
  spotifyClone,
];

export default worksMeta;
