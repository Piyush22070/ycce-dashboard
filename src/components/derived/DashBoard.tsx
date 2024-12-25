import SiteList from './SiteList'
import Finance from "./Finance";

export default function DashBoard() {
  return (
    // <div className="p-3 w-[100%] flex flex-col justify-center items-center">
    <div className="md:flex flex-col justify-center items-center">
      <Finance />
      <SiteList />
    </div>
  );
}
