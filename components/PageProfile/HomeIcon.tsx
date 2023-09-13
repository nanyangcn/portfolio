import { TbWindmillFilled } from 'react-icons/tb';
import { sectionIdList } from 'components/SideBarProfile';
import useProfileScroll from 'hooks/useProfileScroll';

function HomeIcon() {
  const { sectionsPercentage } = useProfileScroll(sectionIdList, 'profile-content');

  let style: React.CSSProperties = {};
  if ('home' in sectionsPercentage
    && typeof sectionsPercentage.home === 'number'
    && sectionsPercentage.home < 2) {
    const aboutPercentage = sectionsPercentage.home;
    style = {
      transform: `rotate(${aboutPercentage * 180}deg)`,
      ...style,
    };
  }

  return (
    <div className="flex w-full justify-center">
      <TbWindmillFilled size={200} style={style} className="" />
    </div>
  );
}

export default HomeIcon;
