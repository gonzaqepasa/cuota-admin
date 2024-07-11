import { deleteUserLogic } from "../../../api-next/user/deleteUser";
import { typesUser } from "../../../types/types-user";
import ButtonDeleteUser from "./ButtonDeleteUser";

interface Props {
  userData: typesUser;
}

export const ConfigUser: React.FC<Props> = ({ userData }) => {
  return (
    <div className={` flex flex-col items-end p-3  w-full h-full  `}>
      <ButtonDeleteUser userData={userData} />
    </div>
  );
};
