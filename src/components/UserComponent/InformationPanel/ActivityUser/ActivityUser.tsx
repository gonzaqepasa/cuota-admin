import { EditActivity } from "./EditActivity/EditActivity";
import { typesUser } from "../../../../types/types-user";
import TextUserPanel from "../TextUserPanel";

interface Props {
  user: typesUser;
}

export const ActivityUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={` flex  justify-between`}>
      <TextUserPanel
        label="Actividad"
        val={user.activity.nameActivity}
        modality={user.activity.modality}
        color={user.activity.color}
      />
      <EditActivity
        activity={user.activity}
        user={user}
        defaultVal={user.activity.modality}
      />
    </div>
  );
};
