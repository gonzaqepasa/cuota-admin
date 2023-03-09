import Link from "next/link";
import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { typesMonthNames, typesUser } from "../../types/types-user";
import styles from "./RenderList.module.scss";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { visibilityUser } from "../../logic/visibilityUser";
import { orderByActive } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { SearcherList } from "./Searcher/SearcherList";
import { FilterList } from "./Filter/FilterList";
import { arrayMonth, dateMonth } from "../Deptor/logic/moths.d";
import LazyLoad from "react-lazy-load";

interface Props {
  userData: typesUser[] | false;
  getDataAgain: () => void;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

export const RenderList: React.FC<Props> = ({
  userData,
  getDataAgain,
  setLoad,
}) => {
  //////// ESTADOS ////////
  // Para el buscador (Searcher)
  const [search, setSearch] = useState("");
  // Para el select de meses (FilterList)
  const [monthSelected, setMonthSelected] = useState<typesMonthNames>(
    arrayMonth[dateMonth]
  );
  // Para el resultado de la busqueda
  const [result, setResult] = useState<[] | typesUser[]>([]);
  const [resultFilter, setResultFilter] = useState(result);
  /////////////////////////

  const [filterOn, setFilterOn] = useState(false);
  // const [dataToRender, setDataToRender] = useState(userData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    // setDataToRender(filterUsers);
  }
  useEffect(() => {
    if (userData) {
      if (!search) {
        setResult(userData);
      } else {
        setResult(
          userData.filter((el) =>
            String(el.name).toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search, userData]);
  useEffect(() => {
    setResultFilter(
      result.filter((user) => {
        return user.calendar.months.find((m) => {
          return m.monthName === monthSelected && m.isPay === false;
        });
      })
    );
  }, [monthSelected, result]);
  console.log("Aca reuslt asdasd", resultFilter);
  if (userData == false)
    return (
      <div className={styles.allRenderList}>
        <h3 style={{ color: "white", margin: "5rem 0" }}>
          No hay usuarios agregados
        </h3>
      </div>
    );
  return (
    <div className={`${styles.allRenderList}`}>
      <FilterList
        setFilterOn={setFilterOn}
        monthSelected={monthSelected}
        setMonthSelected={setMonthSelected}
        filterOn={filterOn}
      />

      <SearcherList handleChange={handleChange} search={search} setSearch={setSearch} />
      <div className={styles.linksContainer}>
        {orderByActive(filterOn ? resultFilter : result).map((el) => (
          <LazyLoad
            key={el.id}
            onContentVisible={() => {
              console.log("loaded!");
            }}
            height={32}
            // width={600}
            threshold={0.5}
          >
            <div
              key={el.id}
              className={`${styles.linkBox} ${
                !el.active && styles.inactiveUser
              }`}
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
                  {firstLetterUpper(el.name)} -{" "}
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
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};
