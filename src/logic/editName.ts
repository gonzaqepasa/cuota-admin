import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { Dispatch, SetStateAction } from "react";
import { typesEditName } from "../types/types-user";

export function editName(
  // Primer Parametro
  { id, name }: typesEditName,

  // Segundo parametro
  getDataAgain: () => void,

  // Tercer Parametro
  setEditOn: Dispatch<SetStateAction<boolean>>,

  // Cuarto Parametro
  setLoad: Dispatch<SetStateAction<boolean>>,

  //Quiento Parametro
  setName: Dispatch<SetStateAction<string>>
) {
  (async function () {
    setLoad(true);
    try {
      const { data } = await axios.put(`${url}/user/edit-name`, {
        id,
        name,
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
      setName(data.name);
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
