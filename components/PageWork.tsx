import Image from 'next/image';
import { Tab } from 'hooks/useTabStore';
import Link from 'next/link';
import { VscGithubAlt, VscLinkExternal } from 'react-icons/vsc';
import testText from 'data/test';
import DragTest from './DragTest';

interface PageWorkProps {
  tab: Tab
}

function PageWork({ tab }: PageWorkProps) {
  if (tab.meta.type !== 'work') throw new Error('Tab Error');
  const { workMeta } = tab.meta;
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-20 border-b-2 border-border-primary">
        <div className="flex items-center justify-start gap-x-4 p-8">
          <Image
            className="rounded-full"
            src={workMeta.icon}
            alt={workMeta.title}
            width={150}
            height={150}
          />
          <div className="flex flex-col items-start gap-y-2 overflow-hidden">
            <h1 className="w-full truncate text-3xl font-bold text-text-primary">{workMeta.title}</h1>
            <p className="w-full truncate text-lg text-text-primary">{workMeta.author}</p>
            <p
              className="w-full truncate text-lg text-text-primary"
              title={workMeta.description}
            >
              {workMeta.description}
            </p>
            <button
              type="button"
              className="rounded-sm bg-primary px-2 py-1 font-bold text-text-primary"
            >
              Check Code
            </button>
          </div>
        </div>
      </div>
      <div className="mx-20 flex min-h-0 grow gap-x-6 text-text-primary">
        <div className="scroll w-full overflow-hidden overflow-y-scroll text-ellipsis px-4 py-8
        [&::-webkit-scrollbar-thumb]:bg-[#5252524d] [&::-webkit-scrollbar]:w-3"
        >
          <DragTest />
        </div>
        <div className="mr-4 flex w-[280px] flex-col py-8">
          <div className="flex flex-col gap-y-3 border-b-2 border-border-primary pb-8">
            <p className="text-2xl">Tech Stacks</p>
            <div className="flex flex-wrap gap-2">
              {workMeta.tags.map((tag) => (
                <p
                  key={tag}
                  className="rounded-sm border-2 border-border-primary p-1 hover:cursor-pointer hover:bg-primary"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-3 py-4">
            <p className="text-xl">Link</p>
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-1 text-primary underline hover:text-text-primary">
                <VscGithubAlt size={22} className="shrink-0" />
                <Link href={workMeta.source} title={workMeta.source} target="_blank" rel="noopener noreferrer">
                  Source Code
                </Link>
              </div>
              <div className="flex items-center gap-x-1 text-primary underline hover:text-text-primary">
                <VscLinkExternal size={20} className="shrink-0" />
                <Link href={workMeta.deployment} title={workMeta.deployment} target="_blank" rel="noopener noreferrer">
                  Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageWork;
