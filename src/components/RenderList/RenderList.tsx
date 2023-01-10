import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { typesUser } from "../../types/types-user";
import styles from "./RenderList.module.scss";
import { ImSearch } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";

export default function RenderList({ userData }: { userData: typesUser[] }) {
  const [search, setSearch] = useState("");
  const [dataToRender, setDataToRender] = useState(userData);

  // console.log("esto es dataToRender", dataToRender);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    const filterUsers = userData.filter((el) =>
      String(el.name)
        .toLowerCase()
        .includes(String(e.target.value).toLowerCase())
    );
    setDataToRender(filterUsers);
  }

  return (
    <div className={`${styles.allRenderList}`}>
      <div className={styles.inputSearchContainer}>
        <div className={styles.spanSearch}>
          <input value={search} onChange={(e) => handleChange(e)} />
          <ImSearch />
        </div>
      </div>

      <div className={styles.linksContainer}>
        {dataToRender.map((el) => (
          <div key={el.id} className={styles.linkBox}>
            <FaUserCheck />
            <Link href={`/gym/${el.id}`}>{el.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
