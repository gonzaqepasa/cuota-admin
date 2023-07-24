import { typesMonth } from "../../types/types-user";

const calculo = {
  Total: (data: typesMonth[]) => {
    let num = 0;
    data.map((el) => (num += el.pricePay));
    return num;
  },
};

export default calculo;
