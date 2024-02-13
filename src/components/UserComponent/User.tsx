import { Description } from "./InformationPanel/Description/Description";
import { NameUser } from "./InformationPanel/NameUser/NameUser";
import { PhoneUser } from "./InformationPanel/PhoneUser/PhoneUser";
import { ActivityUser } from "./InformationPanel/ActivityUser/ActivityUser";
import getUser from "../../api-next/getUser";
import { RenderMonths } from "./Render/RenderMonths";
import { typesUser } from "../../types/types-user";
import { Divider } from "@nextui-org/react";
import { selectColor } from "../../logic/selectColor";
import PanelUser from "./Render/PanelUser";

interface Props {
  id: string;
}

export const User = async ({ id }: { id: Promise<string> }) => {
  const userData: typesUser = await getUser({ id: String(id) });

  if (userData)
    return (
      <div
        className={`grid lg:grid-cols-3 w-screen  lg:p-0  ${` `} ${
          !userData.active && `opacity-40 `
        }`}
      >
        <div className="lg:col-span-1">
          <PanelUser userData={userData} />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center lg:items-stretch ">
          <RenderMonths user={userData} />
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
