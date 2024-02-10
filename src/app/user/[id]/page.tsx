import getUser from "../../../api-next/getUser";
import User from "../../../components/UserComponent/User";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";
interface Props {
  params: {
    id: string;
  };
}

const UserPage = ({ params }: Props) => {
  return (
    <>
      <ProviderNextUi>
        <ProviderAuth>
          <User id={params.id} />
        </ProviderAuth>
      </ProviderNextUi>
    </>
  );
};

export default UserPage;
