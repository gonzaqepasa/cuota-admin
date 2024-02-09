import { useState, useEffect, ChangeEvent } from "react";
import { url } from "../../../../config/env_d";
import { typesActivity } from "../../../../types/types-user";
import Loading from "../../../Loading/Loading";
import { changeActivity } from "../../../../logic/changeActivity";
import { FcCheckmark, FcCancel } from "react-icons/fc";

interface Props {
  id_user?: string;
  activity: typesActivity;
  setEditOn: any;
  getDataAgain: () => void;
}

export const EditActivity: React.FC<Props> = ({
  id_user,
  activity,
  setEditOn,
  getDataAgain,
}) => {
  const [load, setLoad] = useState(true);
  /////////////////// CAMBIAR MODALIDAD ///////////////////////
  const [activityRender, setActivityRender] = useState<typesActivity[]>([
    activity,
  ]);
  //   console.log(activity);
  useEffect(() => {
    (async function () {
      try {
        console.log("Entro a buscar las diferentes actividades");
        const res = await fetch(
          `${url}/activity/get-activity?activity=${activity.nameActivity}`
        );
        const data = await res.json();
        setActivityRender(data);

        setLoad(false);
      } catch (err) {
        setLoad(false);

        console.log(err);
      }
    })();
  }, []);
  ///////////////////////////////////////////////////////////////

  if (load)
    return (
      <div className="h-8  w-56 z-20 flex items-center">
        <Loading size={20} />
      </div>
    );
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedActivity = activityRender.find(
      (a) => a.id === parseInt(event.target.value)
    );
    try {
      changeActivity(
        { activity: selectedActivity, id_user },
        setLoad,
        setEditOn,
        getDataAgain
      );
    } catch (e) {}
    console.log(selectedActivity);
  };
  return (
    <div
      className={`h-8 flex relative z-20 items-center backg-input-edit p-2 rounded`}
    >
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        className={` w-44 bg-transparent font-light text-neutral-200 border-b-2 border-green-600`}
        id=""
      >
        <option className="bg-black">seleccionar</option>
        {activityRender.map((a, i) => (
          <option
            className="bg-neutral-800"
            disabled={a.id === activity.id}
            value={a.id}
            key={i}
          >
            {a.modality}
          </option>
        ))}
      </select>
      <button
        className="opacity-80 transition-opacity hover:opacity-100"
        onClick={() => setEditOn(false)}
      >
        <FcCancel size={20} className="mx-1" />
      </button>
    </div>
  );
};
