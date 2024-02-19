import { getAllActivitiesToDashboard } from "../../api-next/activity/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";

const DashboardPage = async () => {
  const res = await getAllActivitiesToDashboard();

  return (
    <main className="flex flex-col min-h-screen items-center">
      <ProviderAuth>
        <ProviderNextUi>
          <PricesRender data={res.activity} />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default DashboardPage;
