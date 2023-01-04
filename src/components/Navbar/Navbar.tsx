import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CgGym, CgHome } from "react-icons/cg";
export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.allNavbar}>
      <nav className={`${styles.navBox} ${isOpen && styles.isOpen}`}>
        <Link onClick={() => setOpen(false)} href={"/"}>
          {" "}
          <CgHome />
          Inicio
        </Link>
        <Link onClick={() => setOpen(false)} href={"/gym"}>
          <CgGym />
          Funcional
        </Link>
      </nav>
      <div className={styles.btnBox}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
}
