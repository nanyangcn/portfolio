import {
  VscChevronDown, VscChevronRight, VscFolder, VscFolderOpened, VscLoading,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

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
}: SideBarExplorerTreeProps) {
  const { pushTab } = useTabStore();
  const handleOnClick = () => {
    if (isLoading) return null;
    if (type === 'tree') {
      return setIsFold(!isFold);
    }
    if (type === 'blob') {
      const completePath = directory === '' ? path : `${directory}/${path}`;

      return pushTab({
        title: path,
        type: 'text',
        icon: <FileIcon path={path} size={20} />,
        sha,
        path: completePath,
      });
    }
    return null;
  };

  const borderClassName = () => {
    if (depth > 0 && type === 'blob') return 'border-l-[1px]';
    return '';
  };

  const iconSize = 24;

  let FoldIcon = <VscChevronDown size={iconSize} />;
  if (isLoading) {
    FoldIcon = <VscLoading size={iconSize} className="animate-spin" />;
  } else if (isFold) {
    FoldIcon = <VscChevronRight size={iconSize} />;
  }

  const Tree = (
    <>
      {FoldIcon}
      { isFold ? <VscFolder size={iconSize} /> : <VscFolderOpened size={iconSize} /> }
      <p className="whitespace-nowrap text-lg text-text-primary">
        {path}
      </p>
    </>
  );

  const Blob = (
    <>
      <div className="w-[24px]" />
      <FileIcon path={path} size={iconSize} />
      <p className="whitespace-nowrap text-lg text-text-primary">
        {path}
      </p>
    </>
  );

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={twMerge(
        'flex items-center w-full gap-x-2 p-1 hover:bg-border-primary focus:bg-border-primary',
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
