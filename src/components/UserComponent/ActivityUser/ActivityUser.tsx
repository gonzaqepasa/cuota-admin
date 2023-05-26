import Link from "next/link";
import { useEffect, useState } from "react";
import { selectColor } from "../../../logic/selectColor";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";

import { VscEdit } from "react-icons/vsc";
import { typesUser } from "../../../types/types-user";
import { url } from "../../../config/services-url";
import { EditActivity } from "./EditActivity/EditActivity";

interface Props {
  user: typesUser;
  getDataAgain: () => void;
}

export const ActivityUser: React.FC<Props> = ({ user, getDataAgain }) => {
  const [editOn, setEditOn] = useState(false);
  // const [modality, setModality] = useState(user.activity.modality);

  return (
    <div className={`w-full relative flex`}>
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {editOn ? (
        <>
          <EditActivity
            id_user={user.id}
            activity={user.activity}
            setEditOn={setEditOn}
            getDataAgain={getDataAgain}
          />
          <button
            onClick={() => {
              setEditOn(false);
            }}
            className="fixed h-full w-screen top-0 left-0 opacity-80 z-10 bg-black"
          ></button>
        </>
      ) : (
        <div className={`h-8 flex items-center `}>
          <Link
            style={{ color: selectColor(user.activity.nameActivity) }}
            href={`/list/${fromNameToUrl(user.activity.nameActivity)}`}
            className={``}
          >
            {user.activity.nameActivity.toUpperCase()} -{" "}
          </Link>
          <i className="px-2 text-sm animate-one" style={{ color: "grey" }}>
            {user.activity.modality}{" "}
          </i>
          {
            <button
              className={`text-xs absolute right-0 flex p-1 text-neutral-100 bg-neutral-600 rounded-md items-center  opacity-80 transition-opacity duration-500 hover:opacity-100 `}
              onClick={() => setEditOn(true)}
            >
              <VscEdit size={13} />
            </button>
          }
        </div>
      )}
      {/* ////////////////////////////////////////////////////////////////////////// */}
    </div>
  );
};
