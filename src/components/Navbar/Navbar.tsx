import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CgGym, CgHome } from "react-icons/cg";
import {GiHighPunch}from 'react-icons/gi'

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.allNavbar}>
      <nav className={`${styles.navBox} ${isOpen && styles.isOpen}`}>
        <Link className={styles.aHome} onClick={() => setOpen(false)} href={"/"}>
          {" "}
          <CgHome />
          
        </Link>
        <Link onClick={() => setOpen(false)} href={"/gym"}>
          <CgGym />
          Funcional
        </Link><Link onClick={() => setOpen(false)} href={"/taekwondo"}>
          <GiHighPunch />
          Taekwondo
        </Link>
      </nav>
      <div className={styles.btnBox}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
}
