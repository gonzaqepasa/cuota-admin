import Searcher from "./Searcher";
import UsersRender from "./UsersRender/UsersRender";
import { typesActivity, typesUser } from "../../types/types-user";
import { typesPageWithUsers } from "../../types/types-pages";
interface Props {
  // users: typesPageWithUsers;
  activities: typesActivity[];
}
const DashboardComponent: React.FC<Props> = ({  activities }) => {
  return (
    <div className=" w-full flex flex-col items-center relative min-h-screen">
      <Searcher />
      <UsersRender activities={activities} />
    </div>
  );
};

export default DashboardComponent;
