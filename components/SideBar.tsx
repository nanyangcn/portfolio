import Explorer from './Explorer';
import NavBar from './NavBar';

function SideBar() {
  return (
    <div className="flex border-r-[1px] border-neutral-700/50">
      <NavBar />
      <Explorer />
    </div>
  );
}

export default SideBar;
