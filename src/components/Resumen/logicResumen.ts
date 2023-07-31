import axios from "axios";
import { url } from "../../config/services-url";
import { typesItemsToSearch } from "../../../services/payments.service";
import queryString from "query-string";

const ResumenLogic = {
  getResumen: async (data: any) => {
    ////// PRIEMRA CAPA (1°)
    // recibe un objeto con la información a buscar
    // Ej. {monthId:3}
    const queryStringResult = queryString.stringify(data);
    // console.log(queryStringResult);
    try {
      //// conector con la segunda capa
      const { data } = await axios.get(
        `${url}/payments/get-payments?${queryStringResult}`
      );
      //   console.log("Aqui te va esto!!!!!" + data);
      return data;
    } catch (er) {
      console.log(er);
    }
  },
};

export default ResumenLogic;
