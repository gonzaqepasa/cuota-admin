import axios from "axios";
import { ID_BUSINESS, url } from "../config/env_d";

export const getActivityFromApi = async (id_activity: string) => {
  try {
    const { data } = await axios.get(
      `${url}/api/activity/?id_business=${ID_BUSINESS}&id_activity=${id_activity}`
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
