import { EditActivity } from "./EditActivity/EditActivity";
import { typesUser } from "../../../../types/types-user";

interface Props {
  user: typesUser;
}

export const ActivityUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={`w-full relative flex`}>
      <p>{user.activity.nameActivity}</p>
      <p>{user.activity.modality}</p>
      <EditActivity
        activity={user.activity}
        user={user}
        defaultVal={user.activity.modality}
      />
    </div>
  );
};
