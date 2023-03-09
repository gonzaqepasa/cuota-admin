import styles from "./SearcherList.module.scss";
import { ImSearch } from "react-icons/im";
import { typesUser } from "../../../types/types-user";
import { ChangeEvent } from "react";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export const SearcherList: React.FC<Props> = ({ handleChange, search }) => {
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
        <ImSearch />
      </div>
    </div>
  );
};
