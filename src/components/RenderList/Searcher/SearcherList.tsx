import styles from "./SearcherList.module.scss";
import { ImSearch } from "react-icons/im";
import { typesUser } from "../../../types/types-user";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearcherList: React.FC<Props> = ({
  handleChange,
  search,
  setSearch,
}) => {
  return (
    <div className={styles.inputSearchContainer}>
      <div className={styles.spanSearch}>
        <input
          placeholder="Buscar..."
          value={search}
          name="search"
          autoComplete="none"
          onChange={(e) => handleChange(e)}
        />
        {search.length > 0 ? (
          <FiX className={styles.fix} onClick={() => setSearch("")} />
        ) : (
          <ImSearch />
        )}
      </div>
    </div>
  );
};
