import { VscChevronRight } from 'react-icons/vsc';
import FileIcon from './FileIcon';

interface PathBarProps {
  path: string;
}

function PathBar({ path }: PathBarProps) {
  const pathList = path.split('/');
  return (
    <div className="absolute top-0 z-30 flex w-full items-center gap-x-1 bg-additional px-3 py-1">
      {pathList.map((item, index) => (
        <div key={item} className="flex items-center gap-x-1">
          {index > 1 && <VscChevronRight size={20} />}
          {index === pathList.length - 1 && <FileIcon path={item} size={20} />}
          <p className="text-text-secondary hover:text-text-primary">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default PathBar;
