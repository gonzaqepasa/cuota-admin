import axios from "axios";
import { url } from "../../config/env_d";
import { revalidatePath } from "next/cache";

interface Params {
  id: string;
}

const getUser = async ({ id }: Params) => {
  try {
    const { data } = await axios.get(`${url}/user/user?USER=${id}`);
    revalidatePath(`/user/[id]`, "page");

    return data;
  } catch (e) {
    console.log(e);
    return { msg: "Hubo un problema buscando al usuario" };
  }
};

export default getUser;
