import axios from "axios";
import { url } from "../config/env_d";

interface typesToGetUser {
//   id_activity: string;
  id_business: string;
  _id: string;
}

export const getUser = async ({
  id_business,
//   id_activity,
  _id,
}: typesToGetUser) => {
  try {
    const { data } = await axios.get(
      `${url}/api/user/getById/${_id}?id_activity=${"id_business"}&id_business=${id_business}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
