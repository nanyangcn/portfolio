import { useState } from 'react';
import { VscRefresh } from 'react-icons/vsc';

import useSearchStore from 'hooks/useSearchStore';

import SideBarSearchResults from './SideBarSearchResults';

function SideBarSearch() {
  const { keywordState, setKeywordState } = useSearchStore();
  const [inputValue, setInputValue] = useState(keywordState);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const inputElement = event.target as HTMLInputElement;
    setKeywordState(inputElement.value);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === '') {
      setKeywordState(event.target.value);
    }
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
      <div className="flex flex-col gap-y-2 px-4 py-2">
        <input
          id="keyword"
          className="h-8 w-full rounded-sm border-[1px] border-border-primary
          bg-additional px-2 py-4 text-text-primary
          focus:border-primary focus:outline-none [&::placeholder]:text-text-secondary"
          placeholder={'Press \'Enter\' to search'}
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>
      {keywordState
        ? <SideBarSearchResults />
        : null}
    </div>
  );
}

export default SideBarSearch;
