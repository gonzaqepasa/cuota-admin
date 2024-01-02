import { useRouter } from "next/router";
import { deleteActivityLogic } from "../../logic/deleteActivity";
import { typesActivity } from "../../types/types-user";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  dataAct: typesActivity[];
}
const RenderActivities: React.FC<Props> = ({ dataAct }) => {
  const route = useRouter();
  return (
    <div
      className={`${
        dataAct ? "flex " : "hidden"
      } flex-col fadeIn    m-2 max-w-196 w-screen `}
    >
      {dataAct &&
        dataAct.map((el, i) => (
          <div
            key={i}
            className="flex flex-col bg-neutral-800 rounded m-3 p-1 gap-1 text-sm  relative "
          >
            <div className="flex ">
              <p className="mr-1 text-neutral-500">Nombre de actividad:</p>
              <p className="">{el.name}</p>
            </div>
            <div className="flex">
              <p className="mr-1 text-neutral-500">Modalidad:</p>
              <p>{el.modality}</p>
            </div>
            <div className="flex">
              <p className="mr-1 text-neutral-500">Precio:</p>
              <p>{el.price}</p>
            </div>
            <div className="flex m-2 font-light">
              <p>{el.description}</p>
            </div>
            <div className="">
              <button
                className="text-red-700 hover:text-red-600 transition-colors text-xl absolute right-1 bottom-1"
                onClick={() => {
                  deleteActivityLogic(el, route.reload);
                }}
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RenderActivities;
