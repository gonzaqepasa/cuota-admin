import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";
import { url } from "../config/services-url";

interface Params {
  objData: Object;
  nameUser: string;
  setModalAdd: Dispatch<SetStateAction<boolean>>;
  getDataAgain: Function;
  setLoad: Dispatch<SetStateAction<boolean>>;
  cb: ({ id }: { id: number }) => void; // route.push()
}

export async function createUser({
  objData,
  nameUser,
  setModalAdd,
  getDataAgain,
  setLoad,
  cb,
}: Params) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Agregar usuario",
    text: `Seguro quieres agregar a ${nameUser}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#476d7c",
    cancelButtonColor: "#202020",
    confirmButtonText: "Si agregar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        setLoad(true);
        try {
          const { data } = await axios.post(`${url}/user/create-user`, objData);
          // setModalAdd(false);
          // getDataAgain();

          cb({ id: data.id });
          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "success",
            title: `Agregado!`,
            text: `${nameUser} fue agregado con exito!`,
          });
          setLoad(false);
          return data;
        } catch (err) {
          console.log(err);
          setModalAdd(false);
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
