import Image from "next/image";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesUser } from "../../types/types-user";
import LogoText from "../../styles/images/logo.png";
import { Avatar } from "@nextui-org/react";

interface Props {
  user: typesUser;
}
const NameUserComponent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="flex justify-between bg-black w-full p-4">
        <div className="text-xl flex items-center gap-2 text-neutral-300 italic  ">
          <Avatar size="sm" color="primary" />
          <p className="animate__animated animate__zoomInRight">
            {firstLetterUpper(user.name)}
          </p>
        </div>
        <Image className="drop-shadow  " src={LogoText} alt="" width={120} />
      </div>
    </>
  );
};

export default NameUserComponent;
