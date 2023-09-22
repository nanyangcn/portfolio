import {
  VscAccount, VscCode, VscDatabase, VscGithubAlt, VscMail, VscMap, VscRemoteExplorer, VscServer,
} from 'react-icons/vsc';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { GoInfinity } from 'react-icons/go';
import { LuGraduationCap } from 'react-icons/lu';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';

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
  techStacks: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js'],
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
  home: `Hi there, I am Yang Nan, a full-stack developer with a strong foundation in coding skills
        and computer science from both online courses and university coursework.
        I am proficient in front-end technologies like TypeScript, React and Next.js,
        also in back-end like Node.js.
        I also have experience in machine learning frameworks like TensorFlow and PyTorch.
        Before transitioning to web development,
        I had years of experience in writing numerical simulation program in fluid dynamics.
        I am passionate about creating innovative and dynamic web
        apps, and I am eager to continue learning and growing as a web developer.`,
  about: '',
  services: [
    {
      title: 'Full-Stack Developer',
      location: 'Espoo, Finland',
      description:
        `Freelance full-stack developer proficient in React, Next.js, TypeScript,
        TailwindCSS, Node.js, and MongoDB. I'm eager to explore full-time roles.`,
      icon: FaReact,
      date: '2022 - present',
    },
    {
      title: 'Autonomous Systems',
      location: 'Aalto University & KTH',
      description:
        'Master student focus on coursework and projects refer to full-stack development, and machine learning.',
      icon: LuGraduationCap,
      date: '2019 - 2022',
    },
    {
      title: 'Computational Fluid Dynamic',
      location: 'Northwestern Polytechnical University, China',
      description:
        `Doctoral candidate in computational fluid dynamics.
        Focus on writing code for numerical simulation in fluid dynamics.`,
      icon: CgWorkAlt,
      date: '2015 - 2019',
    },
  ],
  work: '',
  contact: '',
};

export interface Stack {
  title: string;
  image: string;
  needBg?: boolean;
}

export interface StackItem {
  category: string;
  icon: IconType;
  stacks: Stack[];
}

export const stacksList: StackItem[] = [
  {
    category: 'Frontend',
    icon: VscRemoteExplorer,
    stacks: [
      { title: 'React', image: 'https://cdn.svgporn.com/logos/react.svg' },
      { title: 'Next.js', image: 'https://cdn.svgporn.com/logos/nextjs-icon.svg' },
      { title: 'Typescript', image: 'https://cdn.svgporn.com/logos/typescript-icon.svg' },
      { title: 'TailwindCSS', image: 'https://cdn.svgporn.com/logos/tailwindcss-icon.svg' },
      { title: 'React-Query', image: 'https://cdn.svgporn.com/logos/react-query-icon.svg' },
      { title: 'Cypress', image: 'https://cdn.svgporn.com/logos/cypress-icon.svg' },
      { title: 'JavaScript', image: 'https://cdn.svgporn.com/logos/javascript.svg' },
      { title: 'HTML5', image: 'https://cdn.svgporn.com/logos/html-5.svg', needBg: true },
      { title: 'CSS3', image: 'https://cdn.svgporn.com/logos/css-3.svg', needBg: true },
    ],
  },
  {
    category: 'Backend',
    icon: VscServer,
    stacks: [
      { title: 'Node.js', image: 'https://cdn.svgporn.com/logos/nodejs-icon-alt.svg' },
      { title: 'Redis', image: 'https://cdn.svgporn.com/logos/redis.svg' },
      { title: 'Express', image: 'https://cdn.svgporn.com/logos/express.svg', needBg: true },
      { title: 'Jest', image: 'https://cdn.svgporn.com/logos/jest.svg' },
      { title: 'Supabase', image: 'https://cdn.svgporn.com/logos/supabase-icon.svg' },
      { title: 'GraphQL', image: 'https://cdn.svgporn.com/logos/graphql.svg' },
      { title: 'Python', image: 'https://cdn.svgporn.com/logos/python.svg' },
      { title: 'Clojure', image: 'https://cdn.svgporn.com/logos/clojure.svg' },
    ],
  },
  {
    category: 'DataBase',
    icon: VscDatabase,
    stacks: [
      { title: 'PostgreSQL', image: 'https://cdn.svgporn.com/logos/postgresql.svg' },
      { title: 'MongoDB', image: 'https://cdn.svgporn.com/logos/mongodb-icon.svg' },
    ],
  },
  {
    category: 'DevOps',
    icon: GoInfinity,
    stacks: [
      { title: 'Docker', image: 'https://cdn.svgporn.com/logos/docker-icon.svg' },
      { title: 'Kubernetes', image: 'https://cdn.svgporn.com/logos/kubernetes.svg' },
      { title: 'Google Cloud', image: 'https://cdn.svgporn.com/logos/google-cloud.svg' },
    ],
  },
  {
    category: 'Other',
    icon: VscCode,
    stacks: [
      { title: 'Git', image: 'https://cdn.svgporn.com/logos/git-icon.svg' },
      { title: 'TensorFlow', image: 'https://cdn.svgporn.com/logos/tensorflow.svg' },
      { title: 'Julia', image: 'https://cdn.svgporn.com/logos/julia.svg', needBg: true },
      { title: 'C', image: 'https://cdn.svgporn.com/logos/c.svg' },
      { title: 'Fortran', image: 'https://cdn.svgporn.com/logos/fortran.svg' },
    ],
  },
];
