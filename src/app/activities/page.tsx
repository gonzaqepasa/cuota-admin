import { cookies } from "next/headers";
import { getAllActivitiesToDashboard } from "../../api-next/activity/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";
export const dynamic = "force-dynamic";

const ActivitiesPage = async () => {
  const res = await getAllActivitiesToDashboard();
 
  const allCookies = cookies();
  const theme =  allCookies.get("theme");
  console.log("theme en page", theme);
  return (
    <main
      className={`${theme?.value} bg-primary-300 flex flex-col min-h-screen items-center`}
    >
      <ProviderAuth>
        <ProviderNextUi>
          <PricesRender data={res} />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default ActivitiesPage;
