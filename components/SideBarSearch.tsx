import { useCallback, useEffect, useState } from 'react';
import { VscClearAll, VscCollapseAll, VscRefresh } from 'react-icons/vsc';

import useSearchStore from 'hooks/useSearchStore';
import useSearchRateLimitStore from 'hooks/useSearchRateLimitStore';
import getRateLimit from 'actions/getRateLimit';
import { dataToLocaleTimeString } from 'libs/utils';

import { twMerge } from 'tailwind-merge';
import SideBarSearchResults from './SideBarSearchResults';

function SideBarSearch() {
  const { keywordState, setKeywordState } = useSearchStore();
  const {
    remainingState, setRemainingState,
    resetState, setResetState,
  } = useSearchRateLimitStore();
  const [inputValue, setInputValue] = useState(keywordState);
  const [queryIter, setQueryIter] = useState(0);
  const [isFoldAll, setIsFoldAll] = useState(false);

  const setSearchRateLimit = useCallback(async () => {
    const { resources } = await getRateLimit();
      type ResourcesWithCodeSearch = typeof resources & {
        code_search: {
          remaining: number;
          reset: number;
        };
      };
      const resourcesWithCodeSearch = resources as ResourcesWithCodeSearch;
      const codeSearch = resourcesWithCodeSearch.code_search;
      setRemainingState(codeSearch.remaining);
      setResetState(dataToLocaleTimeString(codeSearch.reset));
  }, [setRemainingState, setResetState]);

  useEffect(() => {
    setSearchRateLimit().catch(() => { });

    const interval = setInterval(() => {
      setSearchRateLimit().catch(() => { });
    }, 1000 * 60);

    if (remainingState === 0) {
      setTimeout(() => {
        setSearchRateLimit().catch(() => { });
      }, 1000 * 60);
    }

    return () => {
      clearInterval(interval);
    };
  }, [setSearchRateLimit, remainingState]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const inputElement = event.target as HTMLInputElement;
    setKeywordState(inputElement.value);
    await setSearchRateLimit();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === '') {
      setKeywordState(event.target.value);
    }
  };

  const handleClearAll = () => {
    setKeywordState('');
    setInputValue('');
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="truncate px-4 text-lg font-bold text-text-primary">
          SEARCH
        </div>
        <div className="flex gap-x-1">
          <button
            type="button"
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
            onClick={() => setQueryIter((prev) => (prev + 1) % 32768)}
          >
            <VscRefresh size={20} />
          </button>
          <button
            type="button"
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
            onClick={handleClearAll}
          >
            <VscClearAll size={20} />
          </button>
          <button
            type="button"
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
            onClick={() => setIsFoldAll((prev) => !prev)}
          >
            <VscCollapseAll size={20} />
          </button>
        </div>
      </div>
      <div
        className={twMerge(
          'flex justify-between gap-x-4 border-y-2 border-border-primary px-8 py-2',
          remainingState === null ? 'invisible' : 'visible',
        )}
      >
        <p className={remainingState && remainingState < 3 ? 'text-red-500' : ''}>
          {`Remain: ${remainingState}`}
        </p>
        <p>{`Reset: ${resetState}`}</p>
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
          disabled={remainingState === 0}
        />
      </div>
      {keywordState
        ? <SideBarSearchResults queryIter={queryIter} isFoldAll={isFoldAll} />
        : null}
    </div>
  );
}

export default SideBarSearch;
