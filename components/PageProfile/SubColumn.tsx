import React from 'react';
import Link from 'next/link';

import { WorkMeta } from 'data/worksMeta';

interface SubColumnProps {
  meta: WorkMeta
  children?: React.ReactNode
}

function SubColumn({ meta, children = null }: SubColumnProps) {
  return (
    <div className="mr-4 flex w-1/4 min-w-[200px] flex-col divide-y-2 divide-solid divide-border-primary py-6">
      <div className="flex flex-col gap-y-3 pb-8">
        <p className="text-xl">Tech Stacks</p>
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <p
              key={tag}
              className="rounded-sm border-2 border-border-primary p-1 hover:cursor-pointer hover:bg-primary"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-3 py-4">
        <p className="text-xl">Link</p>
        <div className="flex flex-col gap-y-1">
          {meta.links.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-x-1 text-primary underline hover:text-text-primary"
            >
              <link.icon size={22} className="shrink-0" />
              <Link href={link.url} title={link.title} target="_blank" rel="noopener noreferrer">
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export default SubColumn;
