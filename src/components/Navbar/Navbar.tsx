import styles from "./Navbar.module.scss";
import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { selectColor } from "../../logic/selectColor";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebaseConfig";
import { FaArrowCircleUp } from "react-icons/fa";
import { selectAvatar } from "../../logic/selectAvatar";
import { signOutUser } from "../../../firebase/auth/signOut";
import { LinkActivity, LinkNav } from "./Link/LinkNav";

export default function NavbarMain() {
  const route = useRouter();
  console.log(route.asPath);
  const user = auth.currentUser;
  // useEffect(() => {}, []);
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
  //////// Estados ////////
  const [modal, setModal] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [toTop, setToTop] = useState(true);
  /////////////////////////

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY < 30 ? setIsTop(true) : setIsTop(false);
      window.scrollY < 300 ? setToTop(true) : setToTop(false);

    });

  }, []);

  return (
    <>
      <div className={`${styles.allNavbar} ${isTop && styles.isTopNav}`}>
        <div
          className={`${styles.navWithBtn} ${!modal && styles.modalInactive}`}
        >
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
              <div className={`${styles.firstLinks} ${isTop && styles.isTop}`}>
                <LinkNav href={"/prices"} text="Precios" setModal={setModal} />
                <LinkNav
                  text="¿Quién debe?"
                  setModal={setModal}
                  href={"/quien-debe"}
                />
              </div>

              <div className={`${styles.activityLinks}`}>
                <LinkActivity
                  setModal={setModal}
                  text="Gimnasio"
                  href="/list/Gimnasio"
                />
                <LinkActivity
                  setModal={setModal}
                  text="Taekwondo"
                  href="/list/Taekwondo"
                />
                <LinkActivity
                  setModal={setModal}
                  text="Power Box"
                  href="/list/Power%20Box"
                />
                <LinkActivity
                  setModal={setModal}
                  text="Zumba"
                  href="/list/Zumba"
                />
                <LinkActivity
                  setModal={setModal}
                  text="Jiu Jitzu"
                  href="/list/Jiu%20Jitzu"
                />
                <LinkActivity
                  setModal={setModal}
                  text="Acrobacia telas"
                  href="/list/Acrobacia%20telas"
                />
              </div>
            </nav>
          </div>
          <button
            onClick={() => setModal(false)}
            className={`${styles.btnTouchClose} ${
              modal && styles.btnColorTrans
            }`}
          ></button>
        </div>
        <div className={styles.hamburguerBox}>
          <Hamburger
            size={25}
            color="white"
            toggled={modal}
            toggle={setModal}
          />
        </div>
      </div>
      <div className={`${styles.toTop} ${toTop && styles.toTopOn}`}>
        <button  onClick={() => (document.documentElement.scrollTop = 0)}>
          <FaArrowCircleUp />
        </button>
      </div>
    </>
  );
}
