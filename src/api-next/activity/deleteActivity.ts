import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { deleteActivityService } from "../../../services/activity.service";

interface Params {
  _id: any;
  data: typesActivity;
}
export async function deleteActivityClient({ _id }: Params) {
  try {
    const data = await deleteActivityService({ _id });
    console.log(data);
    Swal.fire({
      position: "bottom-end",
      background: "green",
      color: "white",
      text: "Actividad eliminada con exito",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  } catch (err) {
    console.log(err);

    Swal.fire({
      position: "bottom-end",
      background: "red",
      color: "white",
      text: "Hubo un error, consulte con el desarrollador",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  }
}
