import React from 'react';

interface MainContentProps {
  children: React.ReactNode
}

function MainContent({ children }: MainContentProps) {
  return (
    <div
      id="profile-content"
      className="scroll w-full select-text overflow-hidden overflow-y-scroll
      text-ellipsis px-4 py-8 [&::-webkit-scrollbar-thumb]:bg-[#5252524d] [&::-webkit-scrollbar]:w-3"
    >
      {children}
    </div>
  );
}

export default MainContent;
