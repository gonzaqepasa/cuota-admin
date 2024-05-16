import Image from "next/image";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesUser } from "../../types/types-user";
import LogoText from "../../styles/images/logo.png";
import Icon from "../../styles/images/fevicon.png";
import { Avatar } from "@nextui-org/react";
import { CgGym } from "react-icons/cg";

interface Props {
  user: typesUser;
}
const NameUserComponent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <nav className="flex justify-center bg-primary-200 w-full h-16 p-1 ">
        <div className="max-w-5xl flex justify-between w-screen pt-2 pl-2">
          <div className="text-xl flex items-center gap-2 text-neutral-300 italic  ">
            <CgGym className="text-primary" size={25} />

            <p className="animate__animated animate__zoomInRight">
              {firstLetterUpper(user.name)}
            </p>
          </div>
          <Image className="drop-shadow p-1 " src={LogoText} alt="" width={150} />
        </div>
      </nav>
    </>
  );
};

export default NameUserComponent;
