import { cookies } from "next/headers";
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
  const allCookies = cookies();
  const theme = allCookies.get("theme");
  return (
    <main
      className={` ${theme?.value} flex flex-col bg-primary-300 items-center`}
    >
      <ProviderNextUi>
        <ProviderAuth>
          <User payments={payments} userData={userData} />
        </ProviderAuth>
      </ProviderNextUi>
    </main>
  );
};

export default UserPage;
