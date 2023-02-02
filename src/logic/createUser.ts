import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";

export async function createUser(
  objData: Object,
  nameUser: string,
  setModalAdd: Dispatch<SetStateAction<boolean>>,
  getDataAgain: Function
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
        try {
          const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
          const { data } = await axios.post(
            `https://ec2-100-25-130-131.compute-1.amazonaws.com:3000/user/create`,
            objData
          );
          setModalAdd(false);
          getDataAgain();
          console.log(data);
          Swal.fire({
            background: "#090202",
            color: "white",
            icon: "success",
            title: `Agregado!`,
            text: `${nameUser} fue agregado con exito!`,
          });
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
