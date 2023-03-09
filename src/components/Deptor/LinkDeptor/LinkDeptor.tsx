import Link from "next/link";
import styles from "./LinkDeptor.module.scss";
interface Props {
  activityName: string;
}
export const LinkDeptor: React.FC<Props> = ({ activityName }) => {
  return (
    <Link className={styles.link} href={`/quien-debe?activity=${activityName}`}>¿Quién debe?</Link>
  );
};
