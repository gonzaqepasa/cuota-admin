import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";
import { url } from "../config/services-url";
import { firstLetterUpper } from "./firstLetterUpper";

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
  (async () => {
    setLoad(true);
    const name = nameUser.toLowerCase().trim();
    const res = await axios.get(`${url}/user/user-val?USER=${name}`);
    console.log("esto es res", res.data);
    if (res.data.length > 0) {
      Swal.fire({
        reverseButtons: true,
        background: "#202020",
        color: "white",
        title: `Ya existe un usuario llamado ${firstLetterUpper(name)}`,
        text: `Deseas crearlo igual o ir al perfil del usuario`,
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: "#476d7c",
        cancelButtonColor: "#202020",
        denyButtonColor: "#505050",
        denyButtonText: "Crear",
        confirmButtonText: "Ir al perfil",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          cb({ id: res.data[0].id });
        } else if (result.isDenied) {
          create();
        } else {
          setLoad(false);
        }
      });
    } else {
      Swal.fire({
        reverseButtons: true,
        background: "#202020",
        color: "white",
        title: "Agregar usuario",
        text: `Seguro quieres agregar a ${firstLetterUpper(name)}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#476d7c",
        cancelButtonColor: "#202020",
        confirmButtonText: "Si agregar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          create();
        } else {
          setLoad(false);
        }
      });
    }
  })();

  const create = async () => {
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
  };

  /////////////////////////////////////////////////////////////////////////////////
  // Swal.fire({
  //   reverseButtons: true,
  //   background: "#202020",
  //   color: "white",
  //   title: "Agregar usuario",
  //   text: `Seguro quieres agregar a ${nameUser}`,
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#476d7c",
  //   cancelButtonColor: "#202020",
  //   confirmButtonText: "Si agregar",
  //   cancelButtonText: "Cancelar",
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     (async function () {
  //       setLoad(true);
  //       try {
  //         const { data } = await axios.post(`${url}/user/create-user`, objData);
  //         // setModalAdd(false);
  //         // getDataAgain();

  //         cb({ id: data.id });
  //         Swal.fire({
  //           background: "#202020",
  //           color: "white",
  //           icon: "success",
  //           title: `Agregado!`,
  //           text: `${nameUser} fue agregado con exito!`,
  //         });
  //         setLoad(false);
  //         return data;
  //       } catch (err) {
  //         console.log(err);
  //         setModalAdd(false);
  //         Swal.fire({
  //           background: "#202020",
  //           color: "white",
  //           icon: "error",
  //           title: `Hubo un problema`,
  //           text: `Consulte con el desarrollador`,
  //         });
  //       }
  //     })();
  //   }
  // });
}
