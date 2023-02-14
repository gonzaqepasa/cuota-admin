import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { CgGym, CgHome } from "react-icons/cg";
import {
  GiHighPunch,
  GiMusicalNotes,
  GiBoxingGlove,
  GiWinterGloves,
} from "react-icons/gi";
import { HiMusicNote } from "react-icons/hi";
// Imports Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { selectColor } from "../../logic/selectColor";
import Image from "next/image";
import AdminSvg from "../../../styles/Admin.svg";
import { useRouter } from "next/router";
import { fromUrlToName } from "../../logic/fromNameToUrl";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { selectAvatar } from "../../logic/selectAvatar";
import { signOutUser } from "../../../firebase/auth/signOut";

export default function NavbarMain() {
  const route = useRouter();
  const user = auth.currentUser;
  useEffect(() => {}, []);
  const avatar = selectAvatar();
  //////// Estados ////////
  const [modal, setModal] = useState(false);
  /////////////////////////

  return (
    <div className={`${styles.allNavbar}`}>
      <div className={`${styles.navWithBtn} ${!modal && styles.modalInactive}`}>
        <div className={`${styles.responsiveBox}`}>
          <div className={`${styles.header}`}>
            <div className={styles.imgBox}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles.textBox}>
              <p>{user?.email}</p>
            </div>
            <div className={styles.signOutBtnContainer}>
              <button onClick={(e) => signOutUser(e)}>Cerrar sesion</button>
            </div>
          </div>
          <nav className={`${styles.navigation}`}>
            <Link onClick={() => setModal(false)} href={"/prices"}>
              Precios
            </Link>
            <br />
            <Link onClick={() => setModal(false)} href={"/funcional"}>
              Funcional{" "}
            </Link>
            <Link onClick={() => setModal(false)} href={"/taekwondo"}>
              Taekwondo
            </Link>
            {/*    <Link onClick={() => setModal(false)} href={"/ritmo-kids"}>
              Ritmo Kids
            </Link> */}
            <Link onClick={() => setModal(false)} href={"/power-box"}>
              Power Box
            </Link>
            <Link onClick={() => setModal(false)} href={"/zumba"}>
              Zumba
            </Link>
            <Link onClick={() => setModal(false)} href={"/kick-boxing"}>
              Kick-Boxing
            </Link>
          </nav>
        </div>
        <button
          onClick={() => setModal(false)}
          className={`${styles.btnTouchClose} ${modal && styles.btnColorTrans}`}
        ></button>
      </div>
      <div className={styles.hamburguerBox}>
        <Hamburger size={25} color="grey" toggled={modal} toggle={setModal} />
      </div>
    </div>
  );
}
