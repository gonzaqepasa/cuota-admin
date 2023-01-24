import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { typesUser } from "../../types/types-user";
import styles from "./RenderList.module.scss";
import { ImSearch } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";

export default function RenderList({ userData }: { userData: typesUser[] }) {
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

  console.log("aca result", result);
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
        {result.map((el) => (
          <div key={el.id} className={styles.linkBox}>
            <FaUserCheck />
            <Link href={`/${fromNameToUrl(el.activity.nameActivity)}/${el.id}`}>
              {el.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function fromNameToUrl(name: string): String {
  if (name.length > 1) {
    const arr = name.split(" ");
    return `${arr[0]}-${arr[1]}`.toLowerCase();
  }
  return name.toLowerCase();
}
