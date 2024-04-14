import { getAllActivitiesToDashboard } from "../../api-next/activity/getActivity";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";
export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  // const res = await getAllActivitiesToDashboard();
  // console.log("Esto es el fking res", res);

  return (
    <main className="bg-image-center flex flex-col min-h-screen items-center">
      <ProviderAuth>
        <ProviderNextUi>
          <DashboardComponent />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default DashboardPage;
