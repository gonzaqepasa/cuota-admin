import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";

interface payCancelProps {
  id: number;
  monthName: string;
}

export async function payCancel({ id, monthName }: payCancelProps) {
  try {
    await axios.put(`${url}/month/pay-cancel`, {
      id,
    });

    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      title: `Pago Cancelado!`,
      text: `Cancelaste el pago del mes de ${monthName}`,
      confirmButtonColor: "#476d7c",
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      background: "#202020",
      color: "white",
      icon: "error",
      title: `Error inesperado`,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
