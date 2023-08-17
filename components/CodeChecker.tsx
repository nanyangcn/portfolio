'use client';

import { useQuery } from '@tanstack/react-query';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

import Error from 'app/[sha]/error';
import Loading from 'app/[sha]/loading';
import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import getRepoBlob from 'services/repoBlob';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeCheckerProps {
  sha: string
}
function CodeChecker({ sha }: CodeCheckerProps) {
  const { ownerState, repoState } = useCurrentRepoStore();

  const { isLoading, data } = useQuery({
    queryKey: ['repository-blob', ownerState, repoState, sha],
    queryFn: () => getRepoBlob(ownerState, repoState, sha),
  });

  if (isLoading) return <Loading />;
  if (!data) return <Error message="No Data" />;

  const style = {
    margin: 0,
    backgroundColor: 'transparent',
    padding: '64px 512px 1024px 16px',
    lineHeight: '26px',
  };

  return (
    <SyntaxHighlighter
      className="scroll h-full"
      language="typescript"
      style={dark}
      customStyle={style}
      showLineNumbers
    >
      {atob(data.content)}
    </SyntaxHighlighter>
  );
}

export default CodeChecker;
