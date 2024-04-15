import { Suspense } from "react";
import { getUsers } from "../../../api-next/user/getUser";
import TableRenderUser from "./Table";
import { typesUser } from "../../../types/types-user";
interface Props {
  users: typesUser[];
}
const UsersRender: React.FC<Props> = ({ users }) => {
  return (
    <>
      <TableRenderUser users={users} />
    </>
  );
};

export default UsersRender;
