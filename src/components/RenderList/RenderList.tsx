import { AppProps } from "next/app";
import Link from "next/link";
import { typesUser } from "../../types/types-user";
import styles from "./RenderList.module.scss";

export default function RenderList({ userData }: { userData: typesUser[] }) {
  return (
    <div className={`${styles.allRenderList}`}>
      <div className={styles.linksContainer}>
        {userData.map((el) => (
          <Link href={`/gym/${el.id}`}>{el.name}</Link>
        ))}
      </div>
    </div>
  );
}
