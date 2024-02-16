import { getAllActivitiesToEdit } from "../../api-next/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";

const DashboardPage = async () => {
  const res = await getAllActivitiesToEdit();


  return (
    <main className="flex flex-col min-h-screen items-center">
      <ProviderAuth>
        <ProviderNextUi>
          <>{res && <PricesRender data={res.activity} />}</>
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default DashboardPage;
