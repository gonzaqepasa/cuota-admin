'use client'
import { Suspense } from "react";
import { getUsers } from "../../../api-next/user/getUser";
import { typesActivity, typesUser } from "../../../types/types-user";
import Table2 from "./Table/Table2";
interface Props {
  users: typesUser[];
  activities: typesActivity[];
}
const UsersRender: React.FC<Props> = ({ users, activities }) => {
  return (
    <>
      <Table2 users={users} activities={activities} />
    </>
  );
};

export default UsersRender;
