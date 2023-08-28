import { useState } from 'react';
import { VscRefresh } from 'react-icons/vsc';

import SideBarSearchResults from './SideBarSearchResults';

function SideBarSearch() {
  const [keyword, setKeyword] = useState<undefined | string>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const inputElement = event.target as HTMLInputElement;
    setKeyword(inputElement.value);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="truncate px-4 text-lg font-bold text-text-primary">
          SEARCH
        </div>
        <button
          type="button"
          className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
          onClick={() => { }}
        >
          <VscRefresh size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-y-2 px-4 pl-8">
        <input
          id="keyword"
          className="h-8 w-full rounded-sm border-[1px] border-border-primary
          bg-additional px-2 py-4 text-text-primary
          focus:border-primary focus:outline-none [&::placeholder]:text-text-secondary"
          placeholder="Search"
          type="search"
          minLength={3}
          onKeyDown={handleKeyDown}
        />
      </div>
      {keyword
        ? (
          <div className="grow p-4 pl-8 text-text-primary">
            <SideBarSearchResults keyword={keyword} />
          </div>
        )
        : null}
    </div>
  );
}

export default SideBarSearch;
