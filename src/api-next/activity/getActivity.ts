import { typesActivity } from "../../types/types-user";
import { url } from "../../config/env_d";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

export const getAllActivitiesToDashboard = async () => {
  try {
    const res = await fetch(`${url}/activity/get-activities`);
    const data = await res.json();

    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Error al intentar pedir las actividades");
  }
};

export const getActivityClient = async ({ nameActivity }: any) => {
  try {
    const activityRes = await fetch(
      `${url}/activity/get-activity?nameActivity=${nameActivity}`
    );
    const dataActivity = await activityRes.json();
    // Obtén un array de IDs de actividades
    const activityIds = dataActivity.map(
      (activity: typesActivity) => activity._id
    );

    // Convierte los IDs en una cadena de consulta
    const activityIdsQuery = activityIds.join(",");

    // Realiza la solicitud para obtener usuarios por IDs de actividad
    const usersRes = await fetch(
      `${url}/user/get-users-by-activity-ids?activityIds=${activityIdsQuery}`
    );
    const dataUsers = await usersRes.json();

    if (dataActivity.length === 0) {
      return {
        msg: "Esta actividad no existe",
        activity: [],
        users: [],
      };
    }
    revalidatePath(`/activity/${nameActivity}`);
    return {
      activity: dataActivity,
      users: dataUsers,
    };
  } catch (err: any) {
    console.log(err);
    throw new Error("Error al intentar pedir las actividades y usuarios");
  }
};

export const getAllActivitiesForNav = async () => {
  try {
    const activityRes = await fetch(`${url}/activity/get-activities`);
    const dataActivity = await activityRes.json();
    const filteredData: typesActivity[] = Object.values(
      dataActivity.reduce((acc: any, obj: any) => {
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
