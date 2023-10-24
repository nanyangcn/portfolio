import React from 'react';

import ScrollButton from './ScrollButton';

interface MainContentProps {
  children: React.ReactNode
  page: 'profile' | 'work'
}

function MainContent({ children, page }: MainContentProps) {
  return (
    <div className="relative grow">
      <div
        id={`${page}-content`}
        className="scroll flex h-full w-full select-text
        flex-col divide-y-2 divide-solid divide-border-primary overflow-hidden overflow-y-scroll
        text-ellipsis px-4 py-8 [&::-webkit-scrollbar-thumb]:bg-[#5252524d] [&::-webkit-scrollbar]:w-3"
      >
        {children}
      </div>
      <ScrollButton page={page} />
    </div>
  );
}

export default MainContent;
