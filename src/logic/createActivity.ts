import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ID_BUSINESS, url } from "../config/env_d";
import { firstLetterUpper } from "./firstLetterUpper";

interface Params {
  objData: {
    name: string;
    description: string | undefined;
    modality: string | undefined;
    price: number;
    id_business: string;
  };
  cb: () => void;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

export async function createActivity({ objData, cb, setLoad }: Params) {
  const { name, description, price, id_business, modality } = objData;
  const nameTrim = name.toLowerCase().trim();

  (async () => {
    setLoad(true);

    Swal.fire({
      reverseButtons: true,
      background: "#202020",
      color: "white",
      title: "Agregar actividad",
      text: `Seguro quieres agregar la actividad ${firstLetterUpper(nameTrim)}`,

      showCancelButton: true,
      confirmButtonColor: "#476d7c",
      cancelButtonColor: "#202020",
      confirmButtonText: "Si crear",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        create();
      } else {
        setLoad(false);
      }
    });
  })();

  const create = async () => {
    try {
      const { data } = await axios.post(`${url}/api/activity/create`, {
        name: nameTrim,
        modality,
        description,
        price,
        id_business: ID_BUSINESS,
      });
      console.log({
        name: nameTrim,
        modality,
        description,
        price,
        id_business: ID_BUSINESS,
      });

      Swal.fire({
        background: "green",
        color: "white",
        text: `${name} fue agregado con exito!`,
        title: false,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        backdrop: false,
      });
      setLoad(false);
      cb();
      return data;
    } catch (err) {
      console.log(err);
      setLoad(false);
      Swal.fire({
        background: "red",
        color: "white",
        text: `${err}`,
        title: false,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        backdrop: false,
      });
    }
  };
}
