import { cookies } from "next/headers";
import { getActivitiesToDashboard } from "../../../services/activity.service";
import { getAllActivitiesToDashboard } from "../../api-next/activity/getActivity";
import { getUsers } from "../../api-next/user/getUser";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";
export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  // const res = await getAllActivitiesToDashboard();
  const users = await getUsers();
  const activities = await getActivitiesToDashboard();
  const allCookies = cookies();
  const theme = allCookies.get("theme");
  return (
    <main
      className={` ${theme?.value} flex flex-col bg-primary-200 items-center`}
    >
      <ProviderAuth>
        <ProviderNextUi>
          <DashboardComponent users={users} activities={activities} />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default DashboardPage;
