import Swal from "sweetalert2";
import { deleteUser } from "../../../services/user.service";

interface Params {
  id: string;
  cb: () => void;
}
export async function deleteUserLogic({ id, cb }: Params) {
  try {
    const data = await deleteUser({ userId: id });

    console.log(data);
    Swal.fire({
      position: "bottom-end",
      background: "grey",
      color: "white",
      text: "Usuario eliminado con exito",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
    cb();
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
