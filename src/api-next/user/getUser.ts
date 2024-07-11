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
export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${url}/user/get-users`);
    revalidatePath(`/dashboard`, "page");

    return data;
  } catch (e) {
    console.log(e);
    return { msg: "Hubo un problema buscando al usuario" };
  }
};
export const getUsersForPageClient = async ({ page = 1, search = "" }) => {
  try {
    const { data } = await axios.get(
      `${url}/user/get-users-page?page=${page}&search=${search}`
    );

    // revalidatePath(`/dashboard`, "page");
    return data;
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

export default getUser;
