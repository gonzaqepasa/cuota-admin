import { Card, Divider } from "@nextui-org/react";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth } from "../../types/types-user";
import CountdownTimer from "../Dashboard/UsersRender/Table/CountdownTimer";
import { calculateExpirationDate } from "../Payments/BtnAddPay/logicPayments";
import { isUserWithinPaymentMonth } from "../Dashboard/UsersRender/Table/logicPayment";
import { formatDateTime } from "../../logic/dateFormated";

interface Params {
  payments: typesMonth[];
}
const RenderPaymentsComponent: React.FC<Params> = ({ payments }) => {
  return (
    <>
      <div className=" flex flex-col items-center  py-6 w-screen">
        <div>
          <h3 className="text-content1-300 p-2">{"Ultimos pagos"}</h3>
        </div>
        <ol className="flex flex-col items-center  w-screen gap-1">
          {payments.map((p) => (
            <>
              {p.activity && (
                <Card
                  key={p._id}
                  className="w-10/12 max-w-3xl p-2 bg-opacity-80 border-x-4 "
                  shadow="md"
                  style={{ borderColor: p.activity.color }}
                >
                  <div className="flex gap-2 items-center">
                    <p
                      className={`h-4 w-4 rounded-full ${
                        isUserWithinPaymentMonth(p.createdAt)
                          ? "bg-success-500"
                          : "bg-danger-400"
                      }`}
                      // style={{}}
                    ></p>
                    <p>{firstLetterUpper(p.activity?.nameActivity)}</p>
                  </div>
                  <Divider />
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-content1-400 font-light">
                        {"Inicio"}
                      </p>
                      <p className="text-content1-300 text-sm">{formatDateTime(new Date(p.createdAt))}</p>
                    </div>
                    {p.expirationDate && (
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-content1-400 font-light">
                          {"Vence"}
                        </p>
                        <p className="text-content1-300 text-sm">
                          {formatDateTime(new Date(p.expirationDate))}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </>
          ))}
        </ol>
      </div>
    </>
  );
};

export default RenderPaymentsComponent;
