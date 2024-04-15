import { Suspense } from "react";
import Searcher from "./Searcher";
import UsersRender from "./UsersRender/UsersRender";
import Loading from "../../app/loading";
import { typesUser } from "../../types/types-user";
interface Props {
  users: typesUser[];
}
const DashboardComponent: React.FC<Props> = ({ users }) => {
  return (
    <div className=" w-full flex flex-col md:gap-10 items-center relative min-h-screen">
      <Searcher />
      <UsersRender users={users} />
    </div>
  );
};

export default DashboardComponent;
