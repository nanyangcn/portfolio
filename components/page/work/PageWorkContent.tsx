import { WorkMeta } from 'data/worksMeta';
import Video from '../../Video';

interface PageWorkContentProps {
  workMeta: WorkMeta;
}

function PageWorkContent({ workMeta }: PageWorkContentProps) {
  return (
    <div className="flex flex-col gap-y-4 px-2 leading-relaxed text-text-primary">
      <h1 className="border-b-2 border-border-primary pb-4 text-3xl">
        {workMeta.title}
      </h1>

      <h2 className="text-xl">Key features:</h2>
      {workMeta.features?.map((feature) => (
        <div key={feature.title}>
          <div className="py-1">
            <span className="font-bold">
              {`${feature.title}: `}
            </span>
            {feature.description}
          </div>
          {feature.image && feature.title && (
            <Video src={feature.image} />
          )}
        </div>
      ))}
    </div>
  );
}

export default PageWorkContent;
