import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { Dispatch, SetStateAction } from "react";

interface payCancelProps {
  id: number;
  monthName: string;
  getUserAgain: () => void;

  setIsLoad: Dispatch<SetStateAction<boolean>>;
}

export function payCancel({
  id,
  monthName,
  getUserAgain,

  setIsLoad,
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
      setIsLoad(true);

      (async function () {
        try {
          await axios.put(`${url}/month/pay-cancel`, {
            id,
          });

          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "success",
            title: `Pago Cancelado!`,
            text: `Cancelaste el pago del mes de ${monthName}`,
          });
          setIsLoad(false);

          getUserAgain();
        } catch (err) {
          console.log(err);
          setIsLoad(true);

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
