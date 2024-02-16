import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Console } from "console";
import { url } from "../config/env_d";
import { firstLetterUpper } from "../logic/firstLetterUpper";
import { typesActivity } from "../types/types-user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Params {
  objData: Object;
  nameUser: string;
  dataActivity: typesActivity[];
  setLoad: Dispatch<SetStateAction<boolean>>;
  router: AppRouterInstance;
}

export function createUser({
  objData,
  nameUser,
  dataActivity,
  setLoad,
  router,
}: Params) {


  (async () => {
    try {
      setLoad(true);
      const name = nameUser.toLowerCase().trim();
      const res = await axios.get(
        `${url}/user/user-val?USER=${name}&ACTIVITY=${dataActivity[0].nameActivity}`
      );
      console.log("esto es res", res.data);
      if (res.data.length > 0) {
        Swal.fire({
          reverseButtons: true,
          background: "#f2f2f2",
          color: "black",
          title: `Ya existe un usuario llamado ${firstLetterUpper(name)}`,
          text: `Deseas crearlo igual o ir al perfil del usuario`,
          icon: "warning",
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonColor: "#476d7c",
          cancelButtonColor: "#202020",
          denyButtonColor: "#005eff",
          denyButtonText: "Crear",
          confirmButtonText: "Ir al perfil",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/user/${res.data[0].id}`);
          } else if (result.isDenied) {
            create();
          } else {
            setLoad(false);
          }
        });
      } else {
        Swal.fire({
          reverseButtons: true,
          background: "#f2f2f2",
          color: "black",
          title: "Agregar usuario",
          text: `Seguro quieres agregar a ${firstLetterUpper(name)}`,
          showCancelButton: true,
          confirmButtonColor: "#005eff",
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
    } catch (err) {
      console.log(err);
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
  })();

  const create = async () => {
    try {
      const { data } = await axios.post(
        `${url}/user/create-user`,
        objData
      );
      router.refresh();
      // setModalAdd(false);
      // getDataAgain();
      console.log(data);
      Swal.fire({
        background: "#f2f2f2",
        color: "black",
        text: `${firstLetterUpper(nameUser)} fue agregado con exito!`,
        title: false,
        showConfirmButton: true,
        confirmButtonText: "Ir al perfil",
        confirmButtonColor: "#005eff",
        cancelButtonColor: "#00a63a",
        cancelButtonText: "Aceptar",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/user/${data.id}`);
        } else if (result.isDenied) {
        } else {
          setLoad(false);
        }
      });
      setLoad(false);
      return data;
    } catch (err) {
      console.log(err);
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
