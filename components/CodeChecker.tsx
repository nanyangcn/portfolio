'use client';

import { CSSProperties } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

import HighlightKeywordProvider from 'providers/HighlightKeywordProvider';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeCheckerProps {
  encodedText: string
}
function CodeChecker({ encodedText }: CodeCheckerProps) {
  const style: CSSProperties = {
    margin: 0,
    backgroundColor: 'transparent',
    padding: '64px 64px 100% 16px',
    scrollPaddingTop: '-32px',
    lineHeight: '26px',
  };

  return (
    <HighlightKeywordProvider className="min-h-0 grow">
      <SyntaxHighlighter
        className="scroll h-full select-text"
        language="tsx"
        style={dark}
        customStyle={style}
        showLineNumbers
        wrapLines
        lineProps={{ style: { display: 'block' } }}
      >
        {atob(encodedText)}
      </SyntaxHighlighter>
    </HighlightKeywordProvider>
  );
}

export default CodeChecker;
