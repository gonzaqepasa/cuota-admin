import { selectColor } from "../../logic/selectColor";

interface Props {
  activityName: string;
}

export const Title: React.FC<Props> = ({ activityName }) => {
  return (
    <div className={`mt-3`}>
      <h2
        style={{ borderBottom: `solid 1px ${selectColor(activityName)}` }}
        className={`text-neutral-300 text-3xl`}
      >
        {activityName}
      </h2>
      {/* <LinkDeptor activityName={activityName} /> */}
    </div>
  );
};
