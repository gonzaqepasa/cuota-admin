import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../config/services-url";

export function deleteUserLogic(id: any, nameUser: string) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Eliminar usuario",
    text: `¿Seguro quieres eliminar a ${nameUser}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#cf0000",
    cancelButtonColor: "#202020",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.put(`${url}/user/delete-user`, { id });

          console.log(data);
          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "success",
            title: `Agregado!`,
            text: `${nameUser} fue eliminado!`,
          });
        } catch (err) {
          console.log(err);

          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "error",
            title: `Hubo un problema`,
            text: `Consulte con el desarrollador`,
          });
        }
      })();
    }
  });
}
