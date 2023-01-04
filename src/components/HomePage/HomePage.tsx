import Link from "next/link";
import { signOutUser } from "../../../firebase/auth/signOut";
import styles from "./HomePage.module.scss";
import { CgGym } from "react-icons/cg";

export default function HomePage() {
  return (
    <div className={`${styles.allHomePage}`}>
      <div className={styles.text1Box}>
        <h2>Sistema para controlar el pago de cuotas </h2>
      </div>
      <div className={styles.linkContainer}>
        <Link href={"/gym"}>
          <CgGym /> Funcional <CgGym />
        </Link>
      </div>
      <div className={styles.signOutBtnContainer}>
        <button onClick={(e) => signOutUser(e)}>Cerrar sesion</button>
      </div>
    </div>
  );
}
