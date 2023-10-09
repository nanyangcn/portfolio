import { twMerge } from 'tailwind-merge';
import {
  VscChevronDown, VscChevronRight, VscLoading,
} from 'react-icons/vsc';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';

import useTabStore from 'hooks/useTabStore';

import FileIcon from './FileIcon';

interface SideBarExplorerTreeProps {
  sha: string
  path: string
  directory: string
  className?: string
  depth: number
  type: 'blob' | 'tree'
  isLoading: boolean
  isFold: boolean
  setIsFold: (isFold: boolean) => void
  updateRateLimit: () => Promise<void>
}

function SideBarExplorerTreeNode({
  sha,
  path,
  directory,
  className,
  depth,
  type,
  isLoading,
  isFold,
  setIsFold,
  updateRateLimit,
}: SideBarExplorerTreeProps) {
  const { pushTab } = useTabStore();

  const handleOnClick = async () => {
    if (isLoading) return null;
    await updateRateLimit();
    if (type === 'tree') {
      return setIsFold(!isFold);
    }
    if (type === 'blob') {
      const completePath = `${directory}/${path}`;

      return pushTab({
        title: path,
        icon: <FileIcon path={path} size={20} />,
        meta: {
          type: 'text',
          sha,
          path: completePath,
        },
      });
    }
    return null;
  };

  const borderClassName = () => {
    if (depth > 0 && type === 'blob') return 'border-l-[1px]';
    return '';
  };

  const iconSize = 18;

  let FoldIcon = <VscChevronDown size={iconSize} className="shrink-0" />;
  if (isLoading) {
    FoldIcon = <VscLoading size={iconSize} className="shrink-0 animate-spin" />;
  } else if (isFold) {
    FoldIcon = <VscChevronRight size={iconSize} className="shrink-0" />;
  }

  const Tree = (
    <>
      {FoldIcon}
      {isFold
        ? <FcFolder size={iconSize + 4} className="shrink-0" />
        : <FcOpenedFolder size={iconSize + 4} className="shrink-0" />}
      <p className="truncate whitespace-nowrap text-text-primary">
        {path}
      </p>
    </>
  );

  const Blob = (
    <>
      <div className="w-[36px] shrink-0" />
      <FileIcon path={path} size={iconSize} />
      <p className="truncate whitespace-nowrap text-text-primary">
        {path}
      </p>
    </>
  );

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={twMerge(
        'flex items-center w-full gap-x-2 p-[3px] hover:bg-border-primary focus:bg-border-primary',
        'group-hover:border-border-primary border-transparent transition-colors',
        borderClassName(),
        className,
      )}
    >
      {type === 'tree' ? Tree : Blob}
    </button>
  );
}

export default SideBarExplorerTreeNode;
