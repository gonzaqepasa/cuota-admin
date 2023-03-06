import { selectColor } from "../../../logic/selectColor";
import styles from "./Title.module.scss";

export default function Title({ activityName }: { activityName: string }) {
  return (
    <div className={styles.tituleActivityDiv}>
      <h2
        style={{ borderBottom: `2px solid ${selectColor(activityName)}` }}
        className={styles.tituleActivityH2}
      >
        {activityName}
      </h2>
    </div>
  );
}
