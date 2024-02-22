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
    throw new Error("Hubo un problema al intentar obtener un usuario");
  }
};

export default getUser;
