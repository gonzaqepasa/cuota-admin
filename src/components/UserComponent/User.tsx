import { Description } from "./InformationPanel/Description/Description";
import { NameUser } from "./InformationPanel/NameUser/NameUser";
import { PhoneUser } from "./InformationPanel/PhoneUser/PhoneUser";
import { ActivityUser } from "./InformationPanel/ActivityUser/ActivityUser";
import getUser from "../../api-next/getUser";
import { RenderMonths } from "./Render/RenderMonths";
import { typesUser } from "../../types/types-user";
import { Divider } from "@nextui-org/react";

interface Props {
  id: string;
}

export const User = async ({ id }: { id: Promise<string> }) => {
  const userData: typesUser = await getUser({ id: String(id) });

  if (userData)
    return (
      <div
        className={`flex flex-col items-center justify-center  w-screen  min-h-screen ${`lg:flex-row   lg:items-stretch`} ${
          !userData.active && `opacity-40 `
        }`}
      >
        <div className="flex items-start  lg:w-[30rem] lg:h-screen justify-center text-neutral-800 bg-neutral-300 shadow">
          <div className={` flex flex-col w-11/12 py-2 gap-2`}>
            <NameUser user={userData} />
            <Divider />
            <ActivityUser user={userData} />
            <Divider />
            <PhoneUser user={userData} />
            <Divider />
            <Description user={userData} />
          </div>
          <div className={` `}>{/* <ConfigUser userData={user}  /> */}</div>
        </div>

        <RenderMonths user={userData} />
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
