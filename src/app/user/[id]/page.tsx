import { getPaymentsClient } from "../../../api-next/month/getMonths";
import getUser from "../../../api-next/user/getUser";
import User from "../../../components/UserComponent/User";
import { typesMonth, typesUser } from "../../../types/types-user";
import ProviderAuth from "../../ProviderAuth";
import ProviderNextUi from "../../ProviderNextUi";
interface Props {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: Props) => {
  const userData: typesUser = await getUser({ id: String(params.id) });
  const payments: typesMonth[] = await getPaymentsClient({
    id: String(params.id),
  });

  return (
    <main className=" dark bg-primary-200 flex flex-col  items-center justify-center text-neutral-300 ">
      <ProviderNextUi>
        <ProviderAuth>
          <User payments={payments} userData={userData} />
        </ProviderAuth>
      </ProviderNextUi>
    </main>
  );
};

export default UserPage;
