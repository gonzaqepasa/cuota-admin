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
        className={`grid items-center justify-start w-screen h-[calc(100vh-64px)]  lg:p-0  ${` lg:grid-cols-2`} ${
          !userData.active && `opacity-40 `
        }`}
      >
        <PanelUser userData={userData} />

        <RenderMonths user={userData} />
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
