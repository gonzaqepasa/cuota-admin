// "use client";

import { getActivities } from "../../../services/activity.service";
import { getAllActivitiesToEdit } from "../../api-next/getActivity";
import { PricesRender } from "../../components/PricesRender/PricesRender";
import ProviderAuth from "../ProviderAuth";
import ProviderNextUi from "../ProviderNextUi";

const ActivitiesPage = async () => {
  const res = await getAllActivitiesToEdit();
  console.log(res);
  if (!res.activity) return <></>;
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

export default ActivitiesPage;
