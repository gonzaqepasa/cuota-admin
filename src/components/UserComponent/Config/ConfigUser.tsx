import { useRouter } from "next/router";
import { deleteUserLogic } from "../../../logic/deleteUser";
import { typesUser } from "../../../types/types-user";
import { visibilityUser } from "../../../logic/visibilityUser";

interface Props {
  userData: typesUser;
  getDataAgain: () => void;
}

export const ConfigUser: React.FC<Props> = ({ userData, getDataAgain }) => {
  const route = useRouter();
  return (
    <div className={` flex flex-col items-end  w-full h-full  `}>
      <div className="py-1  flex flex-col items-end border-b-2 w-full border-neutral-700">
        <h4 className={`text-neutral-200 text-sm`}>
          {userData.active ? "Desactivar usuario" : "Activar usuario"}
        </h4>
        <button
          onClick={(e) =>
            visibilityUser(
              e,
              { id: Number(userData.id), active: userData.active },
              getDataAgain
            )
          }
          className="text-sm text-cyan-700 hover:text-cyan-600 transition-colors"
        >
          {userData.active ? "Desactivar" : "Activar"}
        </button>
      </div>

      <div
        className={
          " py-1  flex flex-col items-end border-b-2 w-full border-neutral-700"
        }
      >
        <h4 className={`text-neutral-200 text-sm`}>Eliminar usuario</h4>
        <p className={`text-xs text-neutral-500 text-right`}>
          Se perdera la información relacionada *
        </p>
        <button
          className={`text-sm text-red-700 transition-colors hover:text-red-600`}
          onClick={() =>
            deleteUserLogic(userData.calendar.id, userData.name, () =>
              route.push(`/list/${userData.activity.nameActivity}`)
            )
          }
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
