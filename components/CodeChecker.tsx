'use client';

import { CSSProperties } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

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
    <SyntaxHighlighter
      className="scroll grow select-text"
      language="tsx"
      style={dark}
      customStyle={style}
      showLineNumbers
    >
      {atob(encodedText)}
    </SyntaxHighlighter>
  );
}

export default CodeChecker;
