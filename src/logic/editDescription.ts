import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { Dispatch, SetStateAction } from "react";

export function editDescription(
  // Primer Parametro
  e: MouseEvent<HTMLButtonElement>,
  // Segundo parametro
  { id, description }: { id: number; description: String | undefined },
  // Tercer Parametro
  getDataAgain: Function,

  // Cuarto Parametro
  setEditOn: Function,

  //Quiento Parametro
  setLoad: Dispatch<SetStateAction<boolean>>
) {
  (async function () {
    try {
      const { data } = await axios.put(`${url}/user/edit-description`, {
        id,
        description,
      });

      // Swal.fire({
      //   background: "#090202",
      //   color: "white",
      //   icon: "success",
      //   title: "Descripción cambiada!",
      //   text: "Descripción cambiada con éxito!",
      // });
      getDataAgain();
      setEditOn(false);
      setLoad(false);
      console.log("esto llega del patch", data);
      // getUserAgain()
    } catch (err) {
      console.log(err);

      Swal.fire({
        background: "#202020",
        color: "white",
        icon: "error",
        title: `Error inesperado`,
        text: `Consulte con el desarrollador (detalles en consola)`,
      });
      setEditOn(false);
      setLoad(false);
    }
  })();
}
