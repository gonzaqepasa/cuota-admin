import { getAllActivitiesToEdit } from "../../api-next/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";

const DashboardPage = async () => {
  const res = await getAllActivitiesToEdit();

  return (
    <ProviderNextUi>
      <ProviderAuth>
        <main className="flex flex-col min-h-screen items-center">
          <>{res && <PricesRender data={res.activity} />}</>
        </main>
      </ProviderAuth>
    </ProviderNextUi>
  );
};

export default DashboardPage;
