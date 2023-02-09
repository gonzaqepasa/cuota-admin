import { url } from "../../services/services-url";
import PricesRender from "../../src/components/PricesRender/PricesRender";
import { typesActivity } from "../../src/types/types-user";

export default function Prices({
  dataAct,
}: {
  dataAct: typesActivity[] | false;
}) {
  // Component...
  console.log(dataAct);
  if (dataAct == false)
    return <div className={`main`}>Problemas en el servidor</div>;
  return (
    <div className={`main `}>
      <PricesRender data={dataAct} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const resAct = await fetch(`${url}/activity/get-activity`);
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
