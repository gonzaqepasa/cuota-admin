import { Dispatch, SetStateAction, useState } from "react";
import { createActivity } from "../../logic/createActivity";
import { useRouter } from "next/router";

interface Props {
  setLoad: Dispatch<SetStateAction<boolean>>;
}

const FormAddActivity: React.FC<Props> = ({ setLoad }) => {
  const [name, setName] = useState("");
  const [modality, setModality] = useState("");
  const [price, setPrice] = useState(0);

  const route = useRouter();
  return (
    <form
      onSubmit={() => {
        createActivity({
          objData: {
            id_business: "658b7e198278ef37ba017cf9",
            description: "Descripcion aca",
            modality,
            name,
            price,
          },
          cb: route.reload,
          setLoad,
        });
      }}
      className=" bg-neutral-800 p-2 rounded"
    >
      <div>
        <h2>Create activity</h2>
        <div>
          <p>nombre</p>
          <input
            className="text-neutral-800"
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <p>modalidad</p>
          <input
            className="text-neutral-800"
            onChange={(e) => setModality(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <p>precio</p>
          <input
            className="text-neutral-800"
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            name=""
            id=""
          />
        </div>
        <div className="flex justify-center ">
          <button type="submit" className="px-3 my-3 bg-sky-500 rounded ">
            Crear
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAddActivity;
