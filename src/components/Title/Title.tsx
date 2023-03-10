import Link from "next/link";
import { selectColor } from "../../logic/selectColor";
import { typesActivity } from "../../types/types-user";
import { LinkDeptor } from "../Deptor/LinkDeptor/LinkDeptor";
import styles from "./Title.module.scss";

interface Props {
  activityName: string;
}

export const Title: React.FC<Props> = ({ activityName }) => {
  return (
    <div className={styles.tituleActivityDiv}>
      <h2
        style={{ borderBottom: `2px solid ${selectColor(activityName)}` }}
        className={styles.tituleActivityH2}
      >
        {activityName}
      </h2>
      <LinkDeptor activityName={activityName} />
    </div>
  );
};
