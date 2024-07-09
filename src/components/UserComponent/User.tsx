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
        className={`grid lg:grid-cols-3 w-screen  lg:p-0  ${` `} ${
          userData.status === "inactivo" && `opacity-40 `
        }`}
      >
        <div className="lg:col-span-1 bg-image">
          <PanelUser userData={userData} />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center lg:items-stretch ">
          <RenderPay payments={payments} user={userData} />
        </div>
        <div className="fixed z-30 bottom-5 right-5">
          <BtnAddPay
            userData={userData}
            color="primary"
            activities={activities}
            content="Agregar pago"
            size="lg"
            variant="shadow"
          />
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
