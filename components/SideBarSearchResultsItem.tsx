import { useState } from 'react';

import useTabStore from 'hooks/useTabStore';

import { SearchCodeResults } from 'app/api/search/route';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import FileIcon from './FileIcon';

interface SideBarSearchResultsItemProps {
  item: SearchCodeResults['items'][0];
  count: number;
}

function SideBarSearchResultsItem({ item, count }: SideBarSearchResultsItemProps) {
  const { pushTab } = useTabStore();
  const [itemOpen, setItemOpen] = useState(true);

  const iconSize = 20;
  let FoldIcon = <VscChevronDown size={iconSize} className="shrink-0" />;
  if (!itemOpen) {
    FoldIcon = <VscChevronRight size={iconSize} className="shrink-0" />;
  }

  type TextMatches = SearchCodeResults['items'][0]['text_matches'];
  const matchesToItems = (textMatches: TextMatches) => {
    if (!textMatches) return [];
    return textMatches.reduce((acc: JSX.Element[], textMatch) => {
      const { fragment, matches } = textMatch;
      if (!fragment || !matches) return acc;
      const extractLine = (text: string, indices: number[] | undefined) => {
        if (!indices) return (<span>{text}</span>);
        const [start, end] = indices;
        if (start === undefined || end === undefined) return (<span>{text}</span>);
        let lastLineBreakerIndexBeforeStart = text.lastIndexOf('\n', start) < 0 ? 0 : text.lastIndexOf('\n', start);
        let firstLineBreakerIndexAfterEnd = text.indexOf('\n', end) < 0 ? text.length : text.indexOf('\n', end);
        const lengthLimit = 36;
        let preEllipsis = '';
        let postEllipsis = '';
        if (start - lastLineBreakerIndexBeforeStart > lengthLimit) {
          lastLineBreakerIndexBeforeStart = start - lengthLimit;
          preEllipsis = '...';
        }
        if (firstLineBreakerIndexAfterEnd - end > lengthLimit) {
          firstLineBreakerIndexAfterEnd = end + lengthLimit;
          postEllipsis = '...';
        }
        return (
          <span>
            <span>{preEllipsis}</span>
            <span>{text.slice(lastLineBreakerIndexBeforeStart, start)}</span>
            <span className="bg-[#5D2E10]">{text.slice(start, end)}</span>
            <span>{text.slice(end, firstLineBreakerIndexAfterEnd)}</span>
            <span>{postEllipsis}</span>
          </span>
        );
      };
      const extractedLines = matches.map((match) => extractLine(fragment, match.indices));
      return (
        [...extractedLines, ...acc]
      );
    }, []);
  };

  const handleClickItem = () => {
    pushTab({
      title: item.name,
      icon: <FileIcon path={item.name} size={20} />,
      meta: {
        type: 'text',
        sha: item.sha,
        path: `/${item.path}`,
      },
    });
  };

  return (
    <div className="flex flex-col hover:cursor-pointer">
      <div
        key={item.sha}
        className="flex justify-between p-1 hover:bg-border-primary"
        onClick={() => setItemOpen(!itemOpen)}
        onKeyDown={() => setItemOpen(!itemOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-x-2 overflow-hidden">
          {FoldIcon}
          <FileIcon path={item.name} size={iconSize} />
          <span className="truncate" title={item.path}>
            {item.name}
            <span className="truncate pl-2 text-sm text-text-secondary">
              {item.path.split('/').slice(0, -1).join('/')}
            </span>
          </span>
        </div>
        <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-sm">
          {count}
        </div>
      </div>
      {itemOpen && (
      <div className="flex flex-col items-start overflow-hidden border-l-2 border-border-primary pl-6">
        {matchesToItems(item.text_matches).map((matchItem, index) => (
          <button
            key={`${matchItem.key}-${Math.random()}`}
            className="w-full truncate p-1 text-left hover:bg-border-primary"
            type="button"
            title={item.text_matches?.[index]?.fragment}
            onClick={handleClickItem}
          >
            {matchItem}
          </button>
        ))}
      </div>
      )}
    </div>
  );
}

export default SideBarSearchResultsItem;
