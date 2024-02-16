import axios from "axios";
import { url } from "../config/env_d";

interface Params {
  id: string;
}

const getUser = async ({ id }: Params) => {
  
  try {
    const { data } = await axios.get(`${url}/user/user?USER=${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return { msg: "Hubo un problema buscando al usuario" };
  }
};

export default getUser;
