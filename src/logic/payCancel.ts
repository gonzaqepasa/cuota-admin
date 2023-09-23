import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { typesToCancelPayments } from "../../services/payments.service";

interface payCancelProps {
  id: number;
  monthName: string;
  getUserAgain: () => void;
  idToCancelPayments: typesToCancelPayments
}

export function payCancel({
  id,
  monthName,
  getUserAgain,
  idToCancelPayments,
}: payCancelProps) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Cancelar Pago",
    text: `Desea cancelar el pago del mes de ${monthName}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#202020",
    confirmButtonText: "Cancelar Pago",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.put(`${url}/month/pay-cancel`, {
            id,
            idToCancelPayments,
          });

          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "success",
            title: `Pago Cancelado!`,
            text: `Cancelaste el pago del mes de ${monthName}`,
          });

          getUserAgain();
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
      })();
    }
  });
}
