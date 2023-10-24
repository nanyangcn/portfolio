import { twMerge } from 'tailwind-merge';

import { profileMeta } from 'data/profile';
import Home from './Home';
import Header from './Header';
import SubColumn from './SubColumn';
import MainContent from './MainContent';
import About from './About';
import Services from './Services';
import Work from './Work';
import Contact from './Contact';

interface PageProfileProps {
  className?: string
}

function PageProfile({ className }: PageProfileProps) {
  return (
    <div
      className={twMerge(
        'flex h-full w-full flex-col divide-y-2 divide-solid divide-border-primary',
        className,
      )}
    >
      <Header meta={profileMeta} />
      <div className="relative mx-20 flex min-h-0 grow gap-x-6 text-text-primary">
        <MainContent page="profile">
          <Home />
          <About />
          <Services />
          <Work />
          <Contact />
        </MainContent>
        <SubColumn meta={profileMeta} />
      </div>
    </div>
  );
}

export default PageProfile;
