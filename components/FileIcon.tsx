import { VscFile, VscFileCode, VscFileMedia } from 'react-icons/vsc';

interface FileIconProps {
  path: string
  size?: number
}

function FileIcon({ path, size }: FileIconProps) {
  const iconSize = size;
  const extension = path.split('.').pop();
  switch (extension) {
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx': {
      return <VscFileCode size={iconSize} className="shrink-0" />;
    }
    case 'ico':
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif': {
      return <VscFileMedia size={iconSize} className="shrink-0" />;
    }
    default: {
      return <VscFile size={iconSize} className="shrink-0" />;
    }
  }
  return (
    <div>f</div>
  );
}

export default FileIcon;
