import getUser from "../../../api-next/user/getUser";
import User from "../../../components/UserComponent/User";
import { typesUser } from "../../../types/types-user";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";
interface Props {
  params: {
    id: string;
  };
}

const UserPage =async ({ params }: Props) => {
  const userData = await getUser({ id: String(params.id) });

  return (
    <main className="flex flex-col items-center justify-center text-neutral-300 ">
      <ProviderNextUi>
        <ProviderAuth>
          <User userData={userData} />
        </ProviderAuth>
      </ProviderNextUi>
    </main>
  );
};

export default UserPage;
