import React from 'react';
import Image from 'next/image';

import useTabStore from 'hooks/useTabStore';

import { WorkMeta } from 'data/worksMeta';

interface SideBarWorksItemProps {
  workMeta: WorkMeta;
}

function SideBarWorksItem({ workMeta }: SideBarWorksItemProps) {
  const { pushTab } = useTabStore();

  const handleOncClick = () => {
    pushTab({
      title: workMeta.title,
      icon: workMeta.icon,
      meta: {
        type: 'work',
        workMeta,
      },
    });
  };

  return (
    <button
      type="button"
      className="flex items-center px-4 py-3 hover:cursor-pointer hover:bg-border-primary"
      onClick={handleOncClick}
    >
      <Image
        className="rounded-full"
        src={workMeta.icon}
        alt={workMeta.title}
        width={55}
        height={55}
      />
      <div className="flex flex-col items-start justify-center gap-y-0 overflow-hidden pl-4">
        <p className="w-full truncate text-left text-lg font-bold text-text-primary">
          {workMeta.title}
        </p>
        <p className="w-full truncate text-left text-text-secondary">
          {workMeta.description}
        </p>
        <p className="w-full truncate text-left font-bold text-text-secondary">
          {workMeta.author}
        </p>
      </div>
    </button>
  );
}

export default SideBarWorksItem;
