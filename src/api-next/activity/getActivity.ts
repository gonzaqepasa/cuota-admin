import { typesActivity, typesUser } from "../../types/types-user";
import {
  getActivitiesToDashboard,
  getActivityService,
} from "../../../services/activity.service";
import { getUsersByActivityId } from "../../../services/user.service";
import Activity from "../../mongoose/models/Activity";
import User from "../../mongoose/models/User";

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
    const activityRes = await Activity.find({ nameActivity }).populate("users");

    // Obtén un array de IDs de actividades
    const activityIds = activityRes.map((activity) => activity._id);

    // Buscar todos los usuarios que pertenecen a las actividades con los IDs específicos
    const usersRes = await User.find({
      activity: { $in: activityIds }, // Asumo que el campo correcto es "activity._id", ajusta según tu modelo
    }).populate(["activity", "months"]);

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
    const activityRes = await Activity.find();
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
export const getAllActivitiesByName = async ({
  nameActivity,
}: {
  nameActivity: string;
}) => {
  try {
    const activitiesRes = await Activity.find({ nameActivity }).populate(
      "users"
    );
    return activitiesRes;
  } catch (e) {
    console.log(e);
    return [];
  }
};
