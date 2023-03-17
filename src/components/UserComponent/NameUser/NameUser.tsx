import Link from "next/link";
import { useState } from "react";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { selectColor } from "../../../logic/selectColor";
import { VscEdit } from "react-icons/vsc";
import { LinkDeptor } from "../../Deptor/LinkDeptor/LinkDeptor";
import styles from "./NameUser.module.scss";

interface Props {
  user: any;
}

export const NameUser: React.FC<Props> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [editOn, setEditOn] = useState(true);
  return (
    <div className={styles.nameUserBox}>
      <div
        className={`${editOn ? styles.inputContainer : styles.nameContainer}`}
      >
        {editOn ? (
          <>
            <input
              style={{
                borderBottom: `solid 2px ${selectColor(
                  user.activity.nameActivity
                )}`,
              }}
              className={styles.nameInput}
              autoComplete={"none"}
              type="text"
            ></input>
            <div>
              <button>mas</button>
              <button onClick={() => setEditOn(false)}>menos</button>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                borderBottom: `solid 2px ${selectColor(
                  user.activity.nameActivity
                )}`,
              }}
            >
              {firstLetterUpper(name)}
            </h2>
            <button onClick={() => setEditOn(true)}>
              <VscEdit />
            </button>
          </>
        )}
      </div>
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
