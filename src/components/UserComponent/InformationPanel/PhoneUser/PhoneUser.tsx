import { Dispatch, SetStateAction, useState } from "react";
import { typesUser } from "../../../../types/types-user";
import { editPhoneLogic } from "../../../../api-next/editPhone";
import ModalEditUser from "../ModalEditUser";

interface Props {
  user: typesUser;
}

export const PhoneUser: React.FC<Props> = ({ user }) => {
  const [phone, setPhone] = useState<any>(user.phone);

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
      const res = await editPhoneLogic({
        id: String(user.id),
        newPhone: newVal,
      });
      setPhone(res);
      // onClose();
      setLoad(false);
    } catch (e) {
      setLoad(false);
    }
  }

  return (
    <div className={` flex items-center   `}>
      <p>{phone}</p>
      <ModalEditUser
        lenghtVal={0}
        defaultVal={phone || ""}
        handle={handleSubmit}
        user={user}
        title={`Editar numero de teléfono`}
      />
    </div>
  );
};
