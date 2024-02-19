import { getActivityClient } from "../../../api-next/activity/getActivity";
import { RenderList } from "../../../components/RenderList/RenderList";
import { Title } from "../../../components/Title/Title";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";

interface Params {
  params: {
    activity: string;
  };
}

const ActivityListPage = async ({ params }: Params) => {
  const { activity, msg } = await getActivityClient({
    nameActivity: params.activity,
  });
console.log(activity)
  return (
    <main
      style={{ backgroundColor: activity[0].color }}
      className="main bg-neutral-300"
    >
      <ProviderAuth>
        <ProviderNextUi>
          <></>
          <Title data={activity[0]} />
          <RenderList
            activity={String(params.activity)}
            userData={activity[0].users}
            dataActivity={activity}
          />
        </ProviderNextUi>
      </ProviderAuth>
    </main>
  );
};

export default ActivityListPage;
