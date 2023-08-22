import worksMeta from 'data/worksMeta';

import SideBarWorksItem from './SideBarWorksItem';

function SideBarWorks() {
  return (
    <div className="flex flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="pl-4 text-lg font-bold text-text-primary">
          WORKS
        </div>
        <div className="w-fit rounded-full bg-primary px-2 text-text-primary">
          {worksMeta.length}
        </div>
      </div>
      <div className="flex flex-col">
        {worksMeta.map((workMeta) => (
          <SideBarWorksItem
            key={workMeta.title}
            workMeta={workMeta}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBarWorks;
