import styles from "./ActivityUser.module.scss";
import Link from "next/link";
import { selectColor } from "../../../logic/selectColor";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { LinkDeptor } from "../../Deptor/LinkDeptor/LinkDeptor";

interface Props {
  user: any;
}

export const ActivityUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.allActivityUser}>
      <Link
        style={{ color: selectColor(user.activity.nameActivity) }}
        href={`/list/${fromNameToUrl(user.activity.nameActivity)}`}
      >
        <h3>
          {user.activity.nameActivity.toUpperCase()} -{" "}
          <i style={{ fontSize: "0.8rem", color: "grey" }}>
            {user.activity.modality}{" "}
          </i>
        </h3>
      </Link>
      <LinkDeptor activityName={user.activity.nameActivity} />
    </div>
  );
};
