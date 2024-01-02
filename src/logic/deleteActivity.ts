import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../config/env_d";

export  function deleteActivityLogic(el: any, cb: () => void) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Eliminar actividad",
    text: `¿Seguro quieres eliminar la actividad ${el.name}?`,

    showCancelButton: true,
    confirmButtonColor: "#cf0000",
    cancelButtonColor: "#202020",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.delete(
            `${url}/api/activity/delete?_id=${el._id}&id_business=658b7e198278ef37ba017cf9`
          );

          console.log(data);
          Swal.fire({
            position: "bottom-end",
            background: "grey",
            color: "white",
            text: "Usuario eliminado con exito",
            title: false,
            showConfirmButton: false,
            timer: 2500,
            backdrop: false,
          });
          cb();
        } catch (err) {
          console.log(err);

          Swal.fire({
            position: "bottom-end",
            background: "red",
            color: "white",
            text: "Hubo un error, consulte con el desarrollador",
            title: false,
            showConfirmButton: false,
            timer: 2500,
            backdrop: false,
          });
        }
      })();
    }
  });
}
