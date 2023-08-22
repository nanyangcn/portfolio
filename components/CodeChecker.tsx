'use client';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeCheckerProps {
  encodedText: string
}
function CodeChecker({ encodedText }: CodeCheckerProps) {
  const style = {
    margin: 0,
    backgroundColor: 'transparent',
    padding: '64px 512px 1024px 16px',
    lineHeight: '26px',
  };

  return (
    <SyntaxHighlighter
      className="scroll h-full w-full"
      language="typescript"
      style={dark}
      customStyle={style}
      showLineNumbers
    >
      {atob(encodedText)}
    </SyntaxHighlighter>
  );
}

export default CodeChecker;
