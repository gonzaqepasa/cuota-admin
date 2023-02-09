import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

import User from "../../../src/components/UserComponent/User";
import { typesUser } from "../../../src/types/types-user";
import { url } from "../../../services/services-url";

export default function UserData(props: { data: typesUser | false }) {
  // console.log(route.query.id);
  // console.log(props.data);
  const route = useRouter();

  if (props.data == false) {
    return (
      <div className={`main backg backg-funcional`}>
        Problemas con el servidor
      </div>
    );
  }
  return (
    <div className={`main`}>
      <User userData={props.data} id={String(route.query.id)} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  try {
    const res = await fetch(`${url}/user/get-users?activity=Taekwondo`);
    const data = await res.json();
    const paths = data.map((user: any) => ({
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
    const res = await fetch(`${url}/user/user?USER=${params.id}`);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: false } };
  }
}
