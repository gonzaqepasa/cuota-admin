import getUser from "../../../api-next/getUser";
import User from "../../../components/UserComponent/User";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";
interface Props {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: Props) => {
  const res = await getUser({ id: params.id });
  console.log(res);
  return (
    <>
      <ProviderNextUi>
        <ProviderAuth>
          <User userData={res} id={params.id} />
        </ProviderAuth>
      </ProviderNextUi>
    </>
  );
};

export default UserPage;
