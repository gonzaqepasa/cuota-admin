import { useRouter } from "next/router";
import { deleteUserLogic } from "../../../logic/deleteUser";
import { typesUser } from "../../../types/types-user";
import styles from "./ConfigUser.module.scss";

interface Props {
  userData: typesUser;
}

export const ConfigUser: React.FC<Props> = ({ userData }) => {
  const route = useRouter();
  return (
    <div className={styles.allConfigUser}>
      <div className={styles.textContainer}>
        <h4>Eliminar usuario</h4>
        <p>
          Si elimina el usuario se perdera la información relacionada (pagos,
          descripción ,etc.)
        </p>
        <button
          onClick={() =>
            deleteUserLogic(userData.calendar.id, userData.name, () =>
              route.push(`/list/${userData.activity.nameActivity}`)
            )
          }
        >
          Eliminar Usuario
        </button>
      </div>
    </div>
  );
};
