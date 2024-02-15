import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { selectColor } from "../../logic/selectColor";
import { typesActivity } from "../../types/types-user";

interface Props {
  data: typesActivity;
}

export const Title: React.FC<Props> = ({ data }) => {
  return (
    <div className={`m-3 flex flex-col items-center `}>
      <h2
        style={{ borderBottom: `solid 2px ${data.color}` }}
        className={`text-neutral-700 font-medium drop-shadow text-3xl px-3 max-w-4xl`}
      >
        {firstLetterUpper(data.nameActivity)}
      </h2>
      {/* <LinkDeptor activityName={activityName} /> */}
    </div>
  );
};
