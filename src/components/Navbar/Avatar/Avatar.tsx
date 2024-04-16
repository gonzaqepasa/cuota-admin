import { User } from "@nextui-org/react";
import { User as typesUserFirebase } from "firebase/auth";
import { signOutUser } from "../../../../firebase/auth/signOut";

interface Props {
  user: typesUserFirebase;
  avatar: string;
}
const Avatar: React.FC<Props> = ({ user, avatar }) => {
  return (
    <>
      <User
        name={<p className="">{user?.email}</p>}
        description={
          <>
            <button
              className="text-red-600 hover:text-red-400 transition font-bold cursor-pointer"
              onClick={(e) => signOutUser(e)}
            >
              Cerrar sesion
            </button>
          </>
        }
        avatarProps={{
          src: avatar,
        }}
      />
    </>
  );
};

export default Avatar;
