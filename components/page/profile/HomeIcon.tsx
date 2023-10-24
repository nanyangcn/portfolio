import { twMerge } from 'tailwind-merge';
import Cube3D from 'components/Cube3D';

interface HomeIconProps {
  id?: string;
  className?: string;
}

function HomeIcon({ id, className }: HomeIconProps) {
  return (
    <div id={id} className={twMerge('flex justify-center', className)}>
      <Cube3D />
    </div>
  );
}

export default HomeIcon;
