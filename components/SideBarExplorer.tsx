import { useQuery } from '@tanstack/react-query';
import getRepository from 'services/repository';

function SideBarExplorer() {
  const { isLoading, data } = useQuery({
    queryKey: ['repository'],
    queryFn: getRepository,
  });

  if (isLoading) { return <div>Loading...</div>; }
  if (!data) return null;
  return (
    <div>{data.name}</div>
  );
}

export default SideBarExplorer;
