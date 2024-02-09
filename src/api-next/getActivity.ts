import axios from "axios";
import { typesActivity, typesUser } from "../types/types-user";

export interface typesResActivity {
  activity?: typesActivity[];
  users?: typesUser[];
  msg?: string;
}

const getActivityClient = async ({
  activity,
}: any): Promise<typesResActivity> => {
  try {
    const activityRes = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/activity/get-activity?activity=${activity}`
    );

    if ((await activityRes.data.length) === 0) {
      return {
        msg: "Esta actividad no existe",
      };
    }

    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/user/get-users?activity=${activity}`
    );

    return {
      activity: activityRes.data,
      users: userRes.data,
    };
  } catch (err: any) {
    console.log(err);
    return {
      msg: String(err),
    };
  }
};

export default getActivityClient;
