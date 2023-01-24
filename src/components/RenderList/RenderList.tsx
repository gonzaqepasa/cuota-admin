import Link from "next/link";
import { useState, ChangeEvent } from "react";
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
}: {
  userData: typesUser[];
  getDataAgain: Function;
}) {
  const [search, setSearch] = useState("");
  // const [dataToRender, setDataToRender] = useState(userData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    // setDataToRender(filterUsers);
  }
  let result = [];
  if (!search) {
    result = userData;
  } else {
    result = userData.filter((el) =>
      String(el.name).toLowerCase().includes(search.toLowerCase())
    );
  }

  // console.log("aca result", result);
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
            className={styles.linkBox}
            style={{
              borderBottom: `2px solid ${selectColor(
                userData[0].activity.nameActivity
              )}`,
            }}
          >
            <div className={`${styles.linkNameUser}`}>
              <FaUserCheck
                color={selectColor(userData[0].activity.nameActivity)}
              />
              <Link
                href={`/${fromNameToUrl(el.activity.nameActivity)}/${el.id}`}
              >
                {el.name}
              </Link>
            </div>
            <div className={`${styles.iconBox}`}>
              <button
                onClick={(e) => {
                  visibilityUser(
                    e,
                    { id: Number(el.id), active: el.active },
                    getDataAgain
                  );
                }}
              >
                {el.active ? (
                  <MdOutlineVisibility />
                ) : (
                  <MdOutlineVisibilityOff />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
