import { RenderMonths } from "./Render/RenderMonths";
import { typesUser } from "../../types/types-user";
import PanelUser from "./Render/PanelUser";

interface Props {
  userData: typesUser;
}

export const User: React.FC<Props> = ({ userData }) => {
  if (userData)
    return (
      <div
        className={`grid lg:grid-cols-3 w-screen  lg:p-0  ${` `} ${
          userData.status === "inactivo" && `opacity-40 `
        }`}
      >
        <div className="lg:col-span-1">
          <PanelUser userData={userData} />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center lg:items-stretch ">
          {/* <RenderMonths user={userData} /> */}
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
