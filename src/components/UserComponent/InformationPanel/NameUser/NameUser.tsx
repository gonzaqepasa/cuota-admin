import { Dispatch, SetStateAction, useState } from "react";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { editName } from "../../../../api-next/editName";
import ModalEditUser from "../ModalEditUser";
import { typesUser } from "../../../../types/types-user";

interface Props {
  user: typesUser;
}

export const NameUser: React.FC<Props> = ({ user }) => {
  const [name, setName] = useState<any>(user.name);

  async function handleSubmit({
    newVal,
    onClose,
    setLoad,
  }: {
    newVal: string;
    onClose: () => void;
    setLoad: Dispatch<SetStateAction<boolean>>;
  }) {
    try {
      const res = await editName({
        id: String(user.id),
        newName: newVal,
        refresh: () => {},
      });
      setName(res);
      // onClose();
      setLoad(false);
    } catch (e) {
      setLoad(false);
    }
  }

  return (
    <div className={` flex items-center    `}>
      <p>{firstLetterUpper(name)}</p>
      <ModalEditUser
        lenghtVal={2}
        defaultVal={name}
        handle={handleSubmit}
        user={user}
        title={`Editar nombre`}
      />
    </div>
  );
};
