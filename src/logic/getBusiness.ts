import axios from "axios";
import { ID_BUSINESS, url } from "../config/env_d";

export const getBusinessFromApi = async () => {
  try {
    const { data } = await axios.get(`${url}/api/business/?id_business=${ID_BUSINESS}`);
    console.log(data)
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
