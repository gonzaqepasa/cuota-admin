import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import {
  collection,
  doc,
  query,
  setDoc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

import User from "../../../src/components/UserComponent/User";
import { userAgent } from "next/server";

export default function UserData(props: any) {
  const route = useRouter();
  console.log(route.query.id);
  // console.log(props.data);
  return (
    <div className={`main`}>
      <User userData={props.data} id={String(route.query.id)} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  try {
    // const pt = `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/gym/get-users`;
    // const { data } = await axios.get(pt);
    // const res = await fetch(pt);
    // const data = await res.json();

    const querySnapshot = await getDocs(collection(db, "User"));
    const toSend: object[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().activity.name === "Funcional") {
        const { name, phone, age, email, dni, installments, active, activity } =
          doc.data();

        toSend.push({
          name,
          phone,
          email,
          dni,
          installments,
          active,
          activity,
          id: doc.id,
        });
      }
    });

    const paths = toSend.map((user: any) => ({
      params: { id: String(user.id) },
    }));
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
    return { paths: [], fallback: false };
  }
};

export async function getStaticProps({ params }: any) {
  try {
    const docRef = doc(db, "User", params.id);
    const docSnap = await getDoc(docRef);
    // const pt = `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/gym/get-user?id=${params.id}`;
    // const { data } = await axios.get(pt);
    // const res = await fetch(pt);
    // const data = await res.json();
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return { props: { data: docSnap.data() } };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return { props: { data: false } };
    }
  } catch (error) {
    return { props: { data: false } };
  }
}
