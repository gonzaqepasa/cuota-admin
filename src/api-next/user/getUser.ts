import { getUserService } from "../../../services/user.service";

interface Params {
  id: string;
}

const getUser = async ({ id }: Params) => {
  try {
    const data = await getUserService({ id });
    return data;
  } catch (e) {
    console.log(e);
    return { msg: "Hubo un problema buscando al usuario" };
  }
};

export default getUser;
