import { Suspense } from "react";
import { getUsers } from "../../../api-next/user/getUser";
import TableRenderUser from "./Table/Table";
import { typesActivity, typesUser } from "../../../types/types-user";
interface Props {
  users: typesUser[];
  activities: typesActivity[];
}
const UsersRender: React.FC<Props> = ({ users, activities }) => {
  return (
    <>
      <TableRenderUser users={users} activities={activities} />
    </>
  );
};

export default UsersRender;
