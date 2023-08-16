import SideBarWorksItem from './SideBarWorksItem';

function SideBarWorks() {
  const repoNameList = [
    'portfolio',
    'spotify-clone',
  ];

  return (
    <div className="flex flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="pl-4 text-lg font-bold text-text-primary">
          WORKS
        </div>
        <div className="w-fit rounded-full bg-primary px-2 text-text-primary">
          {repoNameList.length}
        </div>
      </div>
      <div className="flex flex-col">
        {repoNameList.map((repoName) => (
          <SideBarWorksItem
            key={repoName}
            title={repoName}
            icon="/avatar.jpeg"
            description="This is a portfolio web app which can also check the code from Github."
            author="nanyangcn"
          />
        ))}
      </div>
    </div>
  );
}

export default SideBarWorks;
