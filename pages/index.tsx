import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { auth } from "../firebase/firebaseConfig";
import LoginForm from "../src/components/LoginForm/LoginForm";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { signOutUser } from "../firebase/auth/signOut";
import Loading from "../src/components/Loading/Loading";

export default function Home() {
 

  return (
    <>
      <main className={styles.main}>
        <Link href={"/gym"}>Gym</Link>
        <button onClick={(e) => signOutUser(e)}>Cerrar sesion</button>
      </main>
    
    </>
  );
}
