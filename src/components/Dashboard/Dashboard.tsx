import { Suspense } from "react";
import Searcher from "./Searcher";
import UsersRender from "./UsersRender/UsersRender";
import Loading from "../../app/loading";
import { typesActivity, typesUser } from "../../types/types-user";
interface Props {
  users: typesUser[];
  activities: typesActivity[];
}
const DashboardComponent: React.FC<Props> = ({ users, activities }) => {
  return (
    <div className=" w-full flex flex-col items-center relative min-h-screen">
      <Searcher />
      <UsersRender users={users} activities={activities} />
    </div>
  );
};

export default DashboardComponent;
