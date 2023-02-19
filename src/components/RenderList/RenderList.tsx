import Link from "next/link";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { typesUser } from "../../types/types-user";
import styles from "./RenderList.module.scss";
import { ImSearch } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";
import { fromNameToUrl } from "../../logic/fromNameToUrl";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { visibilityUser } from "../../logic/visibilityUser";
import { orderByActive } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";

export default function RenderList({
  userData,
  getDataAgain,
  setLoad,
}: {
  userData: typesUser[] | false;
  getDataAgain: Function;
  setLoad: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState("");
  // const [dataToRender, setDataToRender] = useState(userData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    // setDataToRender(filterUsers);
  }
  let result: [] | typesUser[] = [];
  if (userData) {
    if (!search) {
      result = userData;
    } else {
      result = userData.filter((el) =>
        String(el.name).toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  // console.log("aca result", result);

  if (userData == false)
    return (
      <div className={styles.allRenderList}>
        <h3 style={{ color: "white" }}>No hay usuarios agregados</h3>
      </div>
    );
  return (
    <div className={`${styles.allRenderList}`}>
      <div className={styles.inputSearchContainer}>
        <div className={styles.spanSearch}>
          <input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => handleChange(e)}
          />
          <ImSearch />
        </div>
      </div>

      <div className={styles.linksContainer}>
        {orderByActive(result).map((el) => (
          <div
            key={el.id}
            className={`${styles.linkBox} ${!el.active && styles.inactiveUser}`}
            /* style={{
              borderBottom: `1px solid ${selectColor(
                userData[0].activity.nameActivity
              )}`,
            }} */
          >
            <Link href={`/user/${el.id}`}>
              <div className={`${styles.linkNameUser}`}>
                <FaUserCheck
                  color={selectColor(userData[0].activity.nameActivity)}
                />
                {el.name} -{" "}
                <i
                  style={{
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: selectColor(el.activity.nameActivity),
                  }}
                >
                  {el.activity.modality}
                </i>
              </div>
            </Link>
            <div className={`${styles.iconBox}`}>
              <button
                onClick={(e) => {
                  visibilityUser(
                    e,
                    { id: Number(el.id), active: el.active },
                    getDataAgain,
                    setLoad
                  );
                }}
              >
                {el.active ? (
                  <MdOutlineVisibility color="white" />
                ) : (
                  <MdOutlineVisibilityOff color="grey" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
