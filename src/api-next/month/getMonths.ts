import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../config/env_d";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth, typesUser } from "../../types/types-user";
import { monthOfPay } from "../../config/moths";
import { auth } from "../../../firebase/firebaseConfig";
import { revalidatePath } from "next/cache";

interface typesToPay {
  id: string;
}

export async function getPaymentsClient({ id }: typesToPay) {
  const fecha = new Date();
  try {
    const { data } = await axios.get(`${url}/month/get-months?id=${id}`);

    return data;
  } catch (e) {
    console.log(e);
    Swal.fire({
      background: "#202020",
      color: "white",
      icon: "error",
      title: `Error inesperado`,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
