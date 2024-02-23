import { getUserService } from "../../../services/user.service";
import User from "../../mongoose/models/User";
import { typesUser } from "../../types/types-user";

interface Params {
  id: string;
}

const getUser = async ({ id }: Params) => {
  try {
    const user = await User.findById(id).populate(["activity", "months"]);
    return user as typesUser ;
  } catch (e) {
    console.log(e);
    throw new Error("Hubo un problema al intentar obtener un usuario");
  }
};

export default getUser;
