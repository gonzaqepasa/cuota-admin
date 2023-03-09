import Link from "next/link";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { selectColor } from "../../../logic/selectColor";
import { LinkDeptor } from "../../Deptor/LinkDeptor/LinkDeptor";
import styles from "./NameUser.module.scss";

interface Props {
  user: any;
}

export const NameUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.nameUserBox}>
      <h2
        style={{
          borderBottom: `solid 2px ${selectColor(user.activity.nameActivity)}`,
        }}
      >
        {user.name}
      </h2>
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
