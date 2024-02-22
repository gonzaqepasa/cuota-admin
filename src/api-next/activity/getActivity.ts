import { typesActivity, typesUser } from "../../types/types-user";
import {
  getActivitiesToDashboard,
  getActivityService,
} from "../../../services/activity.service";
import { getUsersByActivityId } from "../../../services/user.service";

export const getAllActivitiesToDashboard = async () => {
  try {
    const activityRes = await getActivitiesToDashboard();

    return activityRes;
  } catch (err: any) {
    console.log(err);
    throw new Error("Hubo un problema en el servidor");
  }
};

export const getActivityClient = async ({ nameActivity }: any) => {
  try {
    const activityRes = await getActivityService({
      nameActivity: String(nameActivity),
    });

    // Obtén un array de IDs de actividades
    const activityIds = activityRes.map((activity) => activity._id);

    const usersRes = await getUsersByActivityId({
      activityIds: activityIds,
    });

    if (activityRes.length === 0) {
      return {
        msg: "Esta actividad no existe",
      };
    }

    return {
      activity: activityRes,
      users: usersRes,
    };
  } catch (err: any) {
    console.log(err);
    return {
      msg: String(err),
    };
  }
};

export const getAllActivitiesForNav = async () => {
  try {
    const activityRes = await getActivitiesToDashboard();
    const filteredData: typesActivity[] = Object.values(
      activityRes.reduce((acc: any, obj: any) => {
        // Utiliza la actividad como clave del objeto
        acc[obj.nameActivity] = obj;
        return acc;
      }, {})
    );
    return filteredData;
  } catch (e) {
    console.log(e);
    return [];
  }
};
