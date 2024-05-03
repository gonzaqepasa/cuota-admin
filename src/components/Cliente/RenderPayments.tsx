import { Card, Divider } from "@nextui-org/react";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth } from "../../types/types-user";
import CountdownTimer from "../Dashboard/UsersRender/Table/CountdownTimer";
import { calculateExpirationDate } from "../Payments/BtnAddPay/logicPayments";

interface Params {
  payments: typesMonth[];
}
const RenderPaymentsComponent: React.FC<Params> = ({ payments }) => {
  return (
    <>
      <div className="bg-neutral-900/80 flex flex-col items-center min-h-screen w-screen">
        <ol className="flex flex-col  gap-1">
          {payments.map((p) => (
            <>
              {p.activity && (
                <Card
                  key={p._id}
                  className="min-w-[400px] p-1 bg-opacity-80"
                  shadow="md"
                >
                  <div className="flex gap-2 items-center">
                    <p
                      className="h-4 w-4 rounded-full "
                      style={{ backgroundColor: p.activity?.color }}
                    ></p>
                    <p>{firstLetterUpper(p.activity?.nameActivity)}</p>
                    <p style={{ color: p.activity.color }}>
                      {firstLetterUpper(p.activity?.modality)}
                    </p>
                  </div>
                  <Divider />
                  <div>
                    <CountdownTimer
                      paymentDate={new Date(p.createdAt)}
                      // bg={true}
                      expirationDate={
                        p.expirationDate
                          ? new Date(p.expirationDate)
                          : calculateExpirationDate(new Date(p.createdAt), 1)
                      }
                    />
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
