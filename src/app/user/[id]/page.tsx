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
    <main className="flex flex-col items-center justify-center text-neutral-300 ">
      <ProviderNextUi>
        <ProviderAuth>
          <User id={params.id} />
        </ProviderAuth>
      </ProviderNextUi>
    </main>
  );
};

export default UserPage;
