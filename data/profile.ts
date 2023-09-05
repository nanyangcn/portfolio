import {
  VscAccount, VscGithubAlt, VscMail, VscMap,
} from 'react-icons/vsc';
import { AiOutlineLinkedin } from 'react-icons/ai';

type IconType = typeof VscGithubAlt;
export interface Meta {
  name: string;
  position: string;
  description: string;
  avatar: string;
  techStacks: string[];
  links: {
    title: string;
    url: string;
    icon: string | IconType;
  } []
  information: {
    title: string;
    description: string;
    url: string;
    icon: string | IconType;
  } []
}

export const profileMeta: Meta = {
  name: 'Yang Nan',
  position: 'Full-stack Web Developer',
  description: '',
  avatar: '/avatar.jpeg',
  techStacks: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB', 'ExpressJS', 'Node.js'],
  links: [
    {
      title: 'Github',
      url: 'https://github.com/nanyangcn',
      icon: VscGithubAlt,
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yang-nan-47091119b/',
      icon: AiOutlineLinkedin,
    },
    {
      title: 'Personal Website',
      url: 'https://nanyangcn.com',
      icon: VscAccount,
    },
  ],
  information: [
    {
      title: 'Address',
      description: 'Espoo, Finland',
      url: 'https://www.google.com/maps/place/Espoo',
      icon: VscMap,
    },
    {
      title: 'Email',
      description: 'nanyangcn@gmail.com',
      url: 'mailto:nanyangcn@gmail.com',
      icon: VscMail,
    },
  ],
};

export const profileContent = {
  home: '',
  about: `Hi there, I am Yang Nan, a web developer with a strong foundation in programming concepts
          and best practices from both online courses and university coursework. I have completed
          numerous projects using front-end technologies like HTML, CSS, and JavaScript, as well
          as back-end frameworks like Node.js. Before transitioning to web development,
          I had years of experience coding in other languages, which honed my problem-solving and
          logical thinking skills. I am passionate about creating innovative and dynamic web
          solutions, and I am eager to continue learning and growing as a web developer.`,
  services: '',
  work: '',
  contact: '',
};
