import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticPaths } from "next";

import User from "../../../src/components/UserComponent/User";
import { typesUser } from "../../../src/types/types-user";
import { url } from "../../../src/config/services-url";
import Loading from "../../../src/components/Loading/Loading";

export default function UserData() {
  const route = useRouter();
  // console.log(route.query.id);
  // console.log(props.data);

  const [data, setData] = useState(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });
  ////////// useEffect //////////
  useEffect(() => {
    (async function () {
      try {
        const resUser = await fetch(`${url}/user/user?USER=${route.query.id}`);
        /*  const resAct = await fetch(
          `${url}/activity/get-activity?activity=Funcional`
        ); */
        const dataUser = await resUser.json();
        (await dataUser.length) === 0 &&
          setError({ msg: "No hay gente en la bd" });
        setData(dataUser);
        setLoad(false);

        // const dataAct = await resAct.json();
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, []);

  //////////////////////////////
  if (load) return <Loading />;
  if (error.msg) {
    return <div className={`main backg backg-funcional`}>{error.msg}</div>;
  }
  if (typeof data !== "boolean")
    return (
      <div className={`main background-funcional`}>
        <User userData={data} id={String(route.query.id)} />
      </div>
    );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
//   try {
//     const res = await fetch(`${url}/user/get-users?activity=Funcional`);
//     const data = await res.json();
//     const paths = data.map((user: any) => ({
//       params: { id: String(user.id) },
//     }));
//     return { paths, fallback: false };
//   } catch (err) {
//     console.log(err);
//     return { paths: [], fallback: false };
//   }
// };

// export async function getStaticProps({ params }: any) {
//   try {
//     const res = await fetch(`${url}/user/user?USER=${params.id}`);
//     const data = await res.json();
//     return { props: { data } };
//   } catch (error) {
//     return { props: { data: false } };
//   }
// }
