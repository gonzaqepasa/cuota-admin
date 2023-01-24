import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

import User from "../../../src/components/UserComponent/User";

export default function UserData(props: any) {
  const route = useRouter();
  // console.log(route.query.id);
  // console.log(props.data);


  return (
    <div className={`main background-funcional`}>
      <User userData={props.data} id={String(route.query.id)} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  try {
    const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
    const res = await fetch(`http://${url}/user?activity=Funcional`);
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
    const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
    const res = await fetch(`http://${url}/user/get-user?USER=${params.id}`);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: false } };
  }
}
