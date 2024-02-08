import getActivityClient, {
  typesResActivity,
} from "../../../api-next/getActivity";
import { RenderList } from "../../../components/RenderList/RenderList";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";

interface Params {
  params: {
    activity: string;
  };
}

const ActivityListPage = async ({ params }: Params) => {
  const { users, activity, msg }: typesResActivity = await getActivityClient({
    activity: params.activity,
  });
  // console.log(res);

  if (msg) return <h2>{msg}</h2>;
  if (!users || !activity) return <h2>No encontro usuario ni actividad</h2>;
  return (
    <>
      <ProviderAuth>
        <ProviderNextUi>
          <RenderList
            activity={String(params.activity)}
            userData={users}
            dataActivity={activity}
          />
        </ProviderNextUi>
      </ProviderAuth>
    </>
  );
};

export default ActivityListPage;
