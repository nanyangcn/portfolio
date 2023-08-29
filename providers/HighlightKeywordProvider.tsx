import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import useSearchStore from 'hooks/useSearchStore';
import useTabStore from 'hooks/useTabStore';

interface HighlightKeywordProviderProps {
  children: React.ReactNode;
  className?: string;
}

function HighlightKeywordProvider({ children, className = '' }: HighlightKeywordProviderProps) {
  const { keywordState } = useSearchStore();
  const { tabs } = useTabStore();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerNode = containerRef.current;
    if (!containerNode) return;
    const childElements = containerNode.querySelectorAll('span, button');
    childElements.forEach((childElement) => {
      const typedElement = childElement as HTMLElement;
      typedElement.style.backgroundColor = 'transparent';
      if (keywordState !== ''
        && typedElement.textContent?.toLowerCase().includes(keywordState.toLowerCase())) {
        typedElement.style.backgroundColor = '#5D2E10';
        if (typedElement.parentElement?.tagName === 'CODE') {
          typedElement.style.backgroundColor = '#3A3A3A';
        }
      }
    });
  }, [keywordState, containerRef, tabs]);

  return (
    <div ref={containerRef} className={twMerge('', className)}>
      {children}
    </div>
  );
}

export default HighlightKeywordProvider;
