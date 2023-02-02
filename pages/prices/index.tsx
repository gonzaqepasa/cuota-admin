import PricesRender from "../../src/components/PricesRender/PricesRender";
import { typesActivity } from "../../src/types/types-user";

export default function Prices({
  dataAct,
}: {
  dataAct: typesActivity[] | false;
}) {
  // Component...
  console.log(dataAct)
  return <div className={`main `}>
    <PricesRender data={dataAct}/>
  </div>;
}

export async function getStaticProps() {
  try {
    const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
    const resAct = await fetch(`http://${url}/activity`);
    const dataAct = await resAct.json();

    return {
      props: {
        dataAct,
      },
    };
  } catch (err) {
    return {
      props: {
        dataAct: false,
        // error: err,
      },
    };
  }
}
