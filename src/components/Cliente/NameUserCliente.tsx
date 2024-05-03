import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesUser } from "../../types/types-user";
interface Props {
  user: typesUser;
}
const NameUserComponent: React.FC<Props> = ({user}) => {
  return (
    <>
      <div className="flex flex-col  bg-black w-full p-2">
        <p className="text-2xl text-neutral-300 animate__animated animate__zoomInRight ">
          {firstLetterUpper(user.name)}
        </p>
      </div>
    </>
  );
};

export default NameUserComponent;
