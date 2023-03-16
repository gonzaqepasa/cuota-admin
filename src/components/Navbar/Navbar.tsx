import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Divide as Hamburger } from "hamburger-react";
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
  console.log(route.asPath);
  const user = auth.currentUser;
  // useEffect(() => {}, []);
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
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
              <div className={styles.signOutBtnContainer}>
                <button onClick={(e) => signOutUser(e)}>Cerrar sesion</button>
              </div>
            </div>
          </div>
          <nav className={`${styles.navigation}`}>
            <Link
              className={`${route.pathname === "/prices" && styles.isHere}`}
              onClick={() => setModal(false)}
              href={"/prices"}
            >
              Precios
            </Link>
            <Link
              className={`${route.asPath === "/quien-debe" && styles.isHere}`}
              onClick={() => setModal(false)}
              href={"/quien-debe"}
            >
              ¿Quién debe?
            </Link>
            <br />
            <Link
              style={{ color: ` ${selectColor("Gimnasio")}` }}
              className={`${
                route.asPath === "/list/Gimnasio" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Gimnasio"}
            >
              Gimnasio{" "}
            </Link>
            <Link
              style={{ color: ` ${selectColor("Taekwondo")}` }}
              className={`${
                route.asPath === "/list/Taekwondo" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Taekwondo"}
            >
              Taekwondo
            </Link>
            {/*    <Link onClick={() => setModal(false)} href={"/ritmo-kids"}>
              Ritmo Kids
            </Link> */}
            <Link
              style={{ color: ` ${selectColor("Power Box")}` }}
              className={`${
                route.asPath === "/list/Power%20Box" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Power Box"}
            >
              Power Box
            </Link>
            <Link
              style={{ color: ` ${selectColor("Zumba")}` }}
              className={`${route.asPath === "/list/Zumba" && styles.isHere}`}
              onClick={() => setModal(false)}
              href={"/list/Zumba"}
            >
              Zumba
            </Link>
            <Link
              style={{
                color: ` ${selectColor("Kick Boxing")}`,
              }}
              className={`${
                route.asPath === "/list/Kick%20Boxing" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Kick Boxing"}
            >
              Kick-Boxing
            </Link>
            <Link
              style={{
                color: ` ${selectColor("Jiu Jitzu")}`,
              }}
              className={`${
                route.asPath === "/list/Jiu%20Jitzu" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Jiu Jitzu"}
            >
              Jiu Jitzu
            </Link>
            <Link
              style={{
                color: ` ${selectColor("Acrobacia telas")}`,
              }}
              className={`${
                route.asPath === "/list/Acrobacia%20telas" && styles.isHere
              }`}
              onClick={() => setModal(false)}
              href={"/list/Acrobacia telas"}
            >
              Acrobacia en telas
            </Link>
          </nav>
        </div>
        <button
          onClick={() => setModal(false)}
          className={`${styles.btnTouchClose} ${modal && styles.btnColorTrans}`}
        ></button>
      </div>
      <div className={styles.hamburguerBox}>
        <Hamburger size={25} color="white" toggled={modal} toggle={setModal} />
      </div>
    </div>
  );
}
