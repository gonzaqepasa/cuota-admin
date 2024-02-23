import { revalidatePath } from "next/cache";
import { getAllActivitiesToDashboard } from "../../api-next/activity/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";

const DashboardPage = async () => {
  const res = await getAllActivitiesToDashboard();
  console.log("Esto es el fking res", res);
  revalidatePath('/dashboard/page')
  return (
    <main className="flex flex-col min-h-screen items-center">
      <ProviderAuth>
        <ProviderNextUi>
          <PricesRender data={res} />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default DashboardPage;
