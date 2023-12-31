import { VscGithubAlt, VscLinkExternal } from 'react-icons/vsc';

type IconType = typeof VscGithubAlt;
export interface WorkMeta {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tags: string[];
  links: {
    title: string;
    url: string;
    icon: string | IconType;
  } []
  features?: {
    title?: string;
    description?: string;
    image?: string;
  } []
}

const portfolio: WorkMeta = {
  title: 'Portfolio',
  subtitle: 'nanyangcn',
  description: 'This is a portfolio web app which can also check and search the code.',
  icon: '/avatar.jpeg',
  tags: ['NextJS', 'Tailwindcss', 'Typescript', 'React'],
  links: [
    {
      title: 'Source',
      url: 'https://github.com/nanyangcn/portfolio',
      icon: VscGithubAlt,
    },
    {
      title: 'Demo',
      url: 'https://portfolio-nanyangcn.vercel.app',
      icon: VscLinkExternal,
    },
  ],
  features: [
    {
      title: 'Personal Introduction',
      description: 'Explore a comprehensive presentation of developer\'s information.',
      image: '/portfolio/profile.mp4',
    },
    {
      title: "Developer's Projects",
      description: 'Discover a variety of web projects accompanied by detailed insights.',
      image: '/portfolio/work.mp4',
    },
    {
      title: 'Code Review',
      description: `Experience code examination featuring syntax highlights,
      tabs, and organized folders, just like in a code editor.`,
      image: '/portfolio/code.mp4',
    },
    {
      title: 'Keywords Search',
      description: ' Easily find code sections with keywords.',
      image: '/portfolio/search.mp4',
    },
    {
      title: 'VSCode-Inspired Interface',
      description: 'Visual Studio Code inspired interface, with a resizable and hideable sidebar.',
      image: '/portfolio/ui.mp4',
    },
  ],
};

const spotifyClone: WorkMeta = {
  title: 'Spotify-Clone',
  subtitle: 'nanyangcn',
  description: 'A basic clone of Spotify which can upload and play musics.',
  icon: '/avatar.jpeg',
  tags: ['NextJS', 'Tailwindcss', 'Typescript', 'React', 'Supabase', 'Stripe'],
  links: [
    {
      title: 'Source',
      url: 'https://github.com/nanyangcn/spotify-clone',
      icon: VscGithubAlt,
    },
    {
      title: 'Demo',
      url: 'https://spotify-clone-delta-weld.vercel.app/',
      icon: VscLinkExternal,
    },
  ],
  features: [
    {
      title: 'Authentication',
      description: 'Log in with Google or email.',
      image: '/spotify-clone/login.mp4',
    },
    {
      title: 'Interactive Player',
      description: 'Control playback progress and adjust volume easily.',
      image: '/spotify-clone/player.mp4',
    },
    {
      title: 'Subscription Management',
      description: 'Handle music memberships effortlessly',
      image: '/spotify-clone/subscribe.mp4',
    },
    {
      title: 'Liked List',
      description: 'Build own liked list.',
      image: '/spotify-clone/liked.mp4',
    },
    {
      title: 'Music Library',
      description: 'Upload to contribute to the music library.',
      image: '/spotify-clone/upload.mp4',
    },
    {
      title: 'Find Your Beat',
      description: 'Search easily any music.',
      image: '/spotify-clone/search.mp4',
    },
  ],
};

const worksMeta: WorkMeta[] = [
  portfolio,
  spotifyClone,
];

export default worksMeta;
