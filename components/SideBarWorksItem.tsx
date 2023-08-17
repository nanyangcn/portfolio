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
  const handleOncClick = () => {
    // TODO: Navigate to the description page of the repo.
  };

  return (
    <button
      type="button"
      className="flex items-center px-4 py-3 hover:cursor-pointer hover:bg-border-primary"
      onClick={handleOncClick}
    >
      <Image
        className="rounded-full"
        src={icon}
        alt={title}
        width={55}
        height={55}
      />
      <div className="flex flex-col items-start justify-center gap-y-0 overflow-hidden pl-4">
        <p className="w-full truncate text-left text-lg font-bold text-text-primary">
          {title}
        </p>
        <p className="w-full truncate text-left text-text-secondary">
          {description}
        </p>
        <p className="w-full truncate text-left font-bold text-text-secondary">
          {author}
        </p>
      </div>
    </button>
  );
}

export default SideBarWorksItem;
