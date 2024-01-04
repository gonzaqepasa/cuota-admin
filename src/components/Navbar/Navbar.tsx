import styles from "./Navbar.module.scss";
import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebaseConfig";
import { FaArrowCircleUp } from "react-icons/fa";
import { selectAvatar } from "../../logic/selectAvatar";
import { signOutUser } from "../../../firebase/auth/signOut";
import { LinkActivity, LinkNav } from "./Link/LinkNav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ActivityAdd } from "../../redux/slice/activitySlice";
import { getActivityFromApi } from "../../logic/getActivity";
import { typesActivity, typesBusiness } from "../../types/types-user";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { getBusinessFromApi } from "../../logic/getBusiness";

export default function NavbarMain() {
  const route = useRouter();
  // console.log(route.asPath);
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
  /////
  const business: typesBusiness | null = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        const data = await getBusinessFromApi();
        dispatch(ActivityAdd(data));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <div className={`  ${styles.allNavbar} ${isTop && styles.isTopNav}`}>
        <div
          className={`${styles.navWithBtn} ${!modal && styles.modalInactive}`}
        >
          <div className={`${styles.responsiveBox}`}>
            <div className={`${styles.header}`}>
              <div className={styles.imgBox}>
                <img src={avatar} alt="asd" />
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
                <LinkNav
                  href={"/activity"}
                  text="Actividades"
                  setModal={setModal}
                />
                <LinkNav href={"/resume"} text="Resumen" setModal={setModal} />
              </div>

              <div className={`lg:flex`}>
                {business?.activities?.map((a, i) => (
                  <LinkActivity
                    key={i}
                    setModal={setModal}
                    activityName={firstLetterUpper(a.name)}
                    modalityName={firstLetterUpper(a.modality)}
                    href={`/list/${a._id}`}
                  />
                ))}
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
        <button onClick={() => (document.documentElement.scrollTop = 0)}>
          <FaArrowCircleUp />
        </button>
      </div>
    </>
  );
}
