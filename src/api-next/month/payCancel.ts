import Swal from "sweetalert2";
import { cancelPayMonth } from "../../../services/month.service";

interface payCancelProps {
  id: string;
  monthName: string;
}

export async function payCancel({ id, monthName }: payCancelProps) {
  try {
    await cancelPayMonth({ id });

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
