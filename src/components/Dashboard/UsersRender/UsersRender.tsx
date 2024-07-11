import { Suspense } from "react";
import { typesActivity, typesUser } from "../../../types/types-user";
import Table2 from "./Table/Table2";
import Loading from "../../../app/loading";
interface Props {
  // users: typesPageWithUsers;
  activities: typesActivity[];
}
const UsersRender: React.FC<Props> = ({ activities }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Table2 activities={activities} />
      </Suspense>
    </>
  );
};

export default UsersRender;
