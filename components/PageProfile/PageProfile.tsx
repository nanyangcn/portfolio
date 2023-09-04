import { profileMeta } from 'data/profile';
import Home from './Home';
import Header from './Header';
import SubColumn from './SubColumn';
import MainContent from './MainContent';
import About from './About';
import Services from './Services';
import Work from './Work';
import Contact from './Contact';

function PageProfile() {
  return (
    <div className="flex h-full w-full flex-col divide-y-2 divide-solid divide-border-primary">
      <Header meta={profileMeta} />
      <div className="mx-20 flex min-h-0 grow gap-x-6 text-text-primary">
        <MainContent>
          <div className="flex flex-col">
            <Home />
            <About />
            <Services />
            <Work />
            <Contact />
          </div>
        </MainContent>
        <SubColumn meta={profileMeta} />
      </div>
    </div>
  );
}

export default PageProfile;
