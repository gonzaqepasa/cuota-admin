import styles from "./CardDeptors.module.scss";
import { useState, useEffect } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  data: any;
}

export const CardDeptors: React.FC<Props> = ({ title, data }) => {
  console.log(data);
  const router = useRouter();
  console.log(router);
  const { activity } = router.query;
  const [view, setView] = useState(false);
  useEffect(() => {
    if (activity === title) {
      setView(true);
    }
  });
  return (
    <div
      className={`${styles.allCardDeptors}`}
      //   style={{ border: ` 1px solid ${selectColor(title)} ` }}
    >
      <button onClick={() => setView(!view)} className={`${styles.cardHead} `}>
        <div className={styles.numberLengthBox}>
          <p className={styles.paraLength}>{data.length}</p>
        </div>
        <div className={styles.titleBox}>
          <h3>{title}</h3>
        </div>
        <div className={styles.btnViewBox}>
          <button
            disabled={data.length === 0}
            onClick={() => setView(!view)}
            className={`${styles.btnView} `}
            style={{
              border: `1px solid ${selectColor(title)}`,
              color: selectColor(title),
            }}
          >
            {!view ? <VscChevronDown /> : <VscChevronUp />}
          </button>
        </div>
      </button>
      <div className={`${styles.renderContainer} ${!view && styles.noView}`}>
        {data.map((user: any) => (
          <Link
            href={`/user/${user.calendar.User.id}`}
            className={styles.eachUser}
            key={user.id}
          >
            <p>{user.calendar.User.name}</p>
            <i style={{ color: `${selectColor(title)}` }}>
              {"   ->  "} {user.calendar.User.activity.modality}
            </i>
          </Link>
        ))}
      </div>
    </div>
  );
};
