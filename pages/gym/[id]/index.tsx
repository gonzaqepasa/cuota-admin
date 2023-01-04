import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

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
    const pt = `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/gym/get-users`;
    // const { data } = await axios.get(pt);
    const res = await fetch(pt);
    const data = await res.json();
    const paths = await data.map((user: any) => ({
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
    const pt = `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/gym/get-user?id=${params.id}`;
    // const { data } = await axios.get(pt);
    const res = await fetch(pt);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    return { props: { data: false } };
  }
}
