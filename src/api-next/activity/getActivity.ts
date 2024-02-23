import axios from "axios";
import { typesActivity } from "../../types/types-user";
import { url } from "../../config/env_d";

export const getAllActivitiesToDashboard = async () => {
  try {
    const activityRes = await axios.get(`${url}/activity/get-activities`);

    return { activity: activityRes.data };
  } catch (err: any) {
    console.log(err);
    return {
      msg: "Hubo un problame en el servidor",
      activity: [],
    };
  }
};

export const getActivityClient = async ({ nameActivity }: any) => {
  try {
    const activityRes = await axios.get(
      `${url}/activity/get-activity?nameActivity=${nameActivity}`
    );

    // Obtén un array de IDs de actividades
    const activityIds = activityRes.data.map(
      (activity: typesActivity) => activity._id
    );

    // Convierte los IDs en una cadena de consulta
    const activityIdsQuery = activityIds.join(",");

    // Realiza la solicitud para obtener usuarios por IDs de actividad
    const usersRes = await axios.get(
      `${url}/user/get-users-by-activity-ids?activityIds=${activityIdsQuery}`
    );

    if (activityRes.data.length === 0) {
      return {
        msg: "Esta actividad no existe",
        activity: [],
        users: [],
      };
    }

    return {
      activity: activityRes.data,
      users: usersRes.data,
    };
  } catch (err: any) {
    console.log(err);
    return {
      msg: String(err),
      activity: [],
      users: [],
    };
  }
};

export const getAllActivitiesForNav = async () => {
  try {
    const activityRes = await axios.get(`${url}/activity/get-activities`);
    const filteredData: typesActivity[] = Object.values(
      activityRes.data.reduce((acc: any, obj: any) => {
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
