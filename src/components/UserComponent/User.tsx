import { typesActivity, typesMonth, typesUser } from "../../types/types-user";
import PanelUser from "./Render/PanelUser";
import RenderPay from "./Render/RenderPay";
import { BtnAddPay } from "../Payments/BtnAddPay/BtnAddPay";

interface Props {
  userData: typesUser;
  activities: typesActivity[];
  payments: typesMonth[];
}

export const User: React.FC<Props> = ({ userData, payments, activities }) => {
  // console.log("Esto es user", userData);

  if (userData)
    return (
      <div
        className={`grid lg:grid-cols-3 w-screen  lg:p-0   ${
          userData.status === "inactivo" && `opacity-40 `
        }`}
      >
        <div className="lg:col-span-1 bg-image">
          <PanelUser userData={userData} />
        </div>
        <div className="lg:col-span-2  flex flex-col items-center gap-5 ">
          <div className="sticky top-14 z-20 rounded-b-xl flex flex-col items-stretch w-full bg-success-300/80  p-4">
            <BtnAddPay
              userData={userData}
              color="success"
              activities={activities}
              content="AGREGAR PAGO"
              size="lg"
              variant="solid"
            />
          </div>
          <RenderPay payments={payments} user={userData} />
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
