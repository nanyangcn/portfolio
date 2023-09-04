import { VscGithubAlt, VscLinkExternal } from 'react-icons/vsc';

import { WorkMeta } from './worksMeta';

export const profileMeta: WorkMeta = {
  title: 'Yang Nan',
  subtitle: 'Web Developer',
  description: 'Full-stack Web Developer',
  icon: '/avatar.jpeg',
  tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB', 'ExpressJS', 'Node.js'],
  links: [
    {
      title: 'Github',
      url: 'https://github.com/nanyangcn',
      icon: VscGithubAlt,
    },
    {
      title: 'Personal Website',
      url: 'https://nanyangcn.com',
      icon: VscLinkExternal,
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
