import Image from 'next/image';
import React from 'react';

interface SideBarWorksItemProps {
  title: string;
  icon: string;
  description: string;
  author: string;
}
function SideBarWorksItem({
  title, icon, description, author,
}: SideBarWorksItemProps) {
  return (
    <div className="flex items-center px-4 py-3 hover:cursor-pointer hover:bg-border-primary">
      <Image
        className="rounded-full"
        src={icon}
        alt={title}
        width={55}
        height={55}
      />
      <div className="flex flex-col justify-center gap-y-0 overflow-hidden pl-4">
        <p className="truncate text-lg font-bold text-text-primary">
          {title}
        </p>
        <p className="truncate text-text-secondary">
          {description}
        </p>
        <p className="truncate font-bold text-text-secondary">
          {author}
        </p>
      </div>
    </div>
  );
}

export default SideBarWorksItem;
