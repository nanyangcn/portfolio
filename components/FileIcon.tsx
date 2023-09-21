import Image from 'next/image';
import { FcImageFile, FcRating } from 'react-icons/fc';
import { VscFile, VscFileMedia } from 'react-icons/vsc';

interface FileIconProps {
  path: string
  size?: number
}

function FileIcon({ path, size }: FileIconProps) {
  const iconSize = size;
  const fileName = path.split('/').pop();
  const prefix = fileName?.split('.')[0] ?? '';
  const extension = path.split('.').pop();

  switch (fileName) {
    case 'LICENSE':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/javascript.svg"
          alt="LICENSE"
          width={iconSize}
          height={iconSize}
        />
      );
    default:
  }

  switch (prefix) {
    case 'next':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/nextjs-icon.svg"
          alt="next"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'tailwind':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg"
          alt="tailwind"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'yarn':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/yarn.svg"
          alt="yarn"
          width={iconSize}
          height={iconSize}
        />
      );
    default:
  }

  switch (extension) {
    case 'js':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/javascript.svg"
          alt="js"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'ts':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/typescript-icon.svg"
          alt="ts"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'jsx':
    case 'tsx':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/react.svg"
          alt="tsx"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'css':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/css-3.svg"
          alt="css"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'html':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/html-5.svg"
          alt="html"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'json':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/nodejs-icon.svg"
          alt="json"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'gitignore':
      return (
        <Image
          src="https://cdn.svgporn.com/logos/git-icon.svg"
          alt="gitignore"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'md':
      return (
        <Image
          className="bg-text-primary"
          src="https://cdn.svgporn.com/logos/markdown.svg"
          alt="md"
          width={iconSize}
          height={iconSize}
        />
      );
    case 'ico':
      return <FcRating size={iconSize} className="shrink-0" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
    case 'gif': {
      return <FcImageFile size={iconSize} className="shrink-0" />;
    }
    default: {
      return <VscFile size={iconSize} className="shrink-0" />;
    }
  }
}

export default FileIcon;
