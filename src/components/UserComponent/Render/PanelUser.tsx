import { Divider, user } from "@nextui-org/react";
import { NameUser } from "../InformationPanel/NameUser/NameUser";
import { ActivityUser } from "../InformationPanel/ActivityUser/ActivityUser";
import { PhoneUser } from "../InformationPanel/PhoneUser/PhoneUser";
import { Description } from "../InformationPanel/Description/Description";
import { typesUser } from "../../../types/types-user";
import BtnBack from "../../Globals/BtnBack";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
interface Props {
  userData: typesUser;
}
const PanelUser: React.FC<Props> = ({ userData }) => {
  return (
    <>
      <div className="bg-image flex  flex-col  justify-start items-center    lg:m-0   h-full  text-neutral-800 bg-neutral-300 lg:shadow-lg">
        <div className="flex items-center w-full p-2">
          <BtnBack url={`/dashboard`} />
        </div>
        <Divider />
        <div
          className={` flex flex-col max-w-xl w-11/12 py-2 gap-2 lg:sticky lg:top-16`}
        >
          <NameUser user={userData} />

          <Divider />
          <PhoneUser user={userData} />
          <Divider />
          <Description user={userData} />
          <Divider />
        </div>
        <div className={` `}>{/* <ConfigUser userData={user}  /> */}</div>
      </div>
    </>
  );
};

export default PanelUser;
