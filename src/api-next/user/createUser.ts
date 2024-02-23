import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesActivity } from "../../types/types-user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  createUserService,
  getUserValidate,
} from "../../../services/user.service";

interface Params {
  objData: {
    name: string;
    description?: string;
    activityId: string;
    phoneNumber?: string;
  };
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
  const name = nameUser.toLowerCase().trim();
  (async () => {
    try {
      setLoad(true);
      const res = await getUserValidate({ name, activity: dataActivity });

      if (res.exists) {
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
            router.push(`/user/${res.user._id}`);
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
      const user = await createUserService(objData);
      router.refresh();
      // setModalAdd(false);
      // getDataAgain();

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
          router.push(`/user/${user._id}`);
        } else if (result.isDenied) {
        } else {
          setLoad(false);
        }
      });
      setLoad(false);
      return user;
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
