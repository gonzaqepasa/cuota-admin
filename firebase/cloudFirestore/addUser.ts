import { collection, addDoc } from "firebase/firestore";
import { typesUser } from "../../src/types/types-user";
import { db } from "../firebaseConfig";

export async function addUser(userData:typesUser) {
  console.log(userData)
  try {
    const docRef = await addDoc(collection(db, "User"), userData);
    console.log("Document written with ID: ", docRef.id );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
