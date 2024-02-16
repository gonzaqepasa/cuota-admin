import axios from "axios";
import { typesActivity } from "../types/types-user";
import { url } from "../config/env_d";

export const getAllActivitiesToEdit = async () => {
  try {
    const activityRes = await axios.get(`${url}/activity/get-activity`);

    return { activity: activityRes.data };
  } catch (err: any) {
    console.log(err);
    return {
      msg: "Hubo un problame en el servidor",
      activity: [],
    };
  }
};

export const getActivityClient = async ({ activity }: any) => {
  try {
    const activityRes = await axios.get(
      `${url}/activity/get-activity?activity=${activity}`
    );

    if ((await activityRes.data.length) === 0) {
      return {
        msg: "Esta actividad no existe",
        activity: [],
      };
    }

    const userRes = await axios.get(
      `${url}/user/get-users?activity=${activity}`
    );

    return {
      activity: activityRes.data,
      users: userRes.data,
    };
  } catch (err: any) {
    console.log(err);
    return {
      msg: String(err),
      activity: [],
    };
  }
};

export const getAllActivities = async () => {
  try {
    const activityRes = await axios.get(`${url}/activity/get-activity`);
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
