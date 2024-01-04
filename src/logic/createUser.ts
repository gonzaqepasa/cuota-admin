import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";
import { ID_BUSINESS, url } from "../config/env_d";
import { firstLetterUpper } from "./firstLetterUpper";
import { typesActivity } from "../types/types-user";

interface Params {
  objData: Object;
  nameUser: string;
  dataActivity?: typesActivity[];
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
  dataActivity,

  setLoad,
  cb,
}: Params) {
  (async () => {
    setLoad(true);
    const name = nameUser.toLowerCase().trim();
    const res = await axios.get(
      `${url}/api/user/findByBusiness/${ID_BUSINESS}?id_activity=${
        dataActivity && dataActivity[0]._id
      }&name=${name}`
    );
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
      const { data } = await axios.post(`${url}/api/user/create`, objData);
      // setModalAdd(false);
      // getDataAgain();

      cb({ id: data.id });
      Swal.fire({
        background: "green",
        color: "white",
        text: `${nameUser} fue agregado con exito!`,
        title: false,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        backdrop: false,
      });
      setLoad(false);
      return data;
    } catch (err) {
      console.log(err);
      setModalAdd(false);
      setLoad(false);

      Swal.fire({
        background: "red",
        color: "white",
        text: `Hubo un problema, consulte con el desarrollador`,
        title: false,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        backdrop: false,
      });
    }
  };
}
