import Image from 'next/image';

import { WorkMeta } from 'data/worksMeta';

interface HeaderProps {
  meta: WorkMeta
  children?: React.ReactNode
}

function Header({ meta, children = null }: HeaderProps) {
  return (
    <div className="mx-20">
      <div className="flex items-center justify-start gap-x-8 p-8">
        <Image
          className="rounded-full"
          src={meta.icon}
          alt={meta.title}
          width={150}
          height={150}
        />
        <div className="flex select-text flex-col items-start gap-y-2 overflow-hidden">
          <h1 className="w-full truncate text-3xl font-bold text-text-primary">{meta.title}</h1>
          <p className="w-full truncate text-lg text-text-primary">{meta.subtitle}</p>
          <p
            className="w-full truncate text-lg text-text-primary"
            title={meta.description}
          >
            {meta.description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Header;
