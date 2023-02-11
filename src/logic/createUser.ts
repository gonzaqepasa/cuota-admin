import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";
import { url } from "../config/services-url";

export async function createUser(
  objData: Object,
  nameUser: string,
  setModalAdd: Dispatch<SetStateAction<boolean>>,
  getDataAgain: Function,
  setLoad: Dispatch<SetStateAction<boolean>>
) {
  Swal.fire({
    reverseButtons: true,
    background: "#090202",
    color: "white",
    title: "Agregar usuario",
    text: `Seguro quieres agregar a ${nameUser}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si agregar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        setLoad(true);
        try {
          const { data } = await axios.post(`${url}/user/create-user`, objData);
          setModalAdd(false);
          getDataAgain();
          console.log(data);
          // Swal.fire({
          //   background: "#090202",
          //   color: "white",
          //   icon: "success",
          //   title: `Agregado!`,
          //   text: `${nameUser} fue agregado con exito!`,
          // });
          // setLoad(false);
        } catch (err) {
          console.log(err);
          setModalAdd(false);
          Swal.fire({
            background: "#090202",
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
