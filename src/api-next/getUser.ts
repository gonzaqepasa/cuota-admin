import axios from "axios";

interface Params {
  id: string;
}

const getUser = async ({ id }: Params) => {
  const url = process.env.NEXT_PUBLIC_LOCAL_URL || "";
  try {
    const { data } = await axios.get(`${url}/api/user/user?USER=${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return { msg: "Hubo un problema buscando al usuario" };
  }
};

export default getUser;
