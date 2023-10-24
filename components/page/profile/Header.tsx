import Image from 'next/image';

import { Meta } from 'data/profile';
import { WorkMeta } from 'data/worksMeta';

interface HeaderProps {
  meta?: Meta
  workMeta?: WorkMeta
  children?: React.ReactNode
}

function Header({ meta, workMeta, children = null }: HeaderProps) {
  return (
    <div className="mx-20 text-text-primary">
      <div className="flex items-center justify-start gap-x-8 p-8">
        <Image
          className="shrink-0 rounded-full"
          src={meta?.avatar ?? workMeta?.icon ?? ''}
          alt={meta?.name ?? workMeta?.title ?? ''}
          width={150}
          height={150}
        />
        <div className="flex h-full select-text flex-col items-start justify-around gap-y-2 overflow-hidden">
          <h1 className="w-full truncate pb-2 text-4xl font-bold">{meta?.name ?? workMeta?.title}</h1>
          <p className="w-full truncate text-xl">{meta?.position ?? workMeta?.subtitle}</p>
          <p
            className="w-full truncate text-lg"
            title={meta?.description ?? workMeta?.description}
          >
            {meta?.description ?? workMeta?.description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Header;
