import { useQuery } from '@tanstack/react-query';
import Error from 'app/error';
import Loading from 'app/loading';
import getRepository from 'services/repository';

function SideBarExplorer() {
  const { isLoading, data } = useQuery({
    queryKey: ['repository'],
    queryFn: () => getRepository('nanyangcn', 'portfolio1'),
  });
  if (isLoading) { return <Loading className="items-start p-4" />; }
  if (!data) return <Error className="items-start p-4" />;
  return (
    <div>{data.name}</div>
  );
}

export default SideBarExplorer;
