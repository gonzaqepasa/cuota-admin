import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { typesActivity } from "../types/types-user";
import { numberToMoney } from "./numberToMoney";

export function editPrice(
  // Primer Parametro
  e: MouseEvent<HTMLButtonElement>,
  // Segundo parametro
  { id, nameActivity, modality, price }: typesActivity,
  // Tercer Parametro
  setPrice: Function,
  // Cuarto Parametro
  setEditOn: Function
) {
  Swal.fire({
    reverseButtons: true,
    background: "#0f202b",
    color: "white",
    title: `Cambiar precio a ${nameActivity} - ${modality}`,
    text: `El nuevo precio sería ${price}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#476d7c",
    cancelButtonColor: "#0f202b",
    confirmButtonText: "Cambiar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.put(`${url}/activity/edit-price`, {
            id,
            price,
          });

          Swal.fire({
            background: "#0f202b",
            color: "white",
            icon: "success",
            title: "Precio cambiado",
            text: `El nuevo precio para ${nameActivity} - ${modality} es ${numberToMoney(
              price
            )}`,
          });
          setPrice(price);
          setEditOn(false);
          console.log("esto llega del patch", data);
          // getUserAgain()
        } catch (err) {
          console.log(err);

          Swal.fire({
            background: "#0f202b",
            color: "white",
            icon: "error",
            title: `Error inesperado`,
            text: `Consulte con el desarrollador (detalles en consola)`,
          });
          setEditOn(false);
        }
      })();
    }
  });
}
