import { collection, addDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import { typesUser } from "../../src/types/types-user";
import { db } from "../firebaseConfig";

export async function addUser(
  userData: typesUser,
  setModalAdd: Dispatch<SetStateAction<boolean>>
) {
  console.log(userData);
  try {
    const docRef = await addDoc(collection(db, "User"), userData);
    console.log("Document written with ID: ", docRef.id);
    Swal.fire({
      title: `Se agrego el usuario ${userData.name}`,
      icon: "success",
      background: "#090202",
      color: "white",
    });
    setModalAdd(false);
    
  } catch (e) {
    console.error("Error adding document: ", e);
    Swal.fire({
      title: `Hubo un error al ingresar el usuario`,
      text: "Contactar al desarrollador",
      icon: "error",
      background: "#090202",
      color: "white",
    });
  }
}
