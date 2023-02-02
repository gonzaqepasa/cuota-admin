import { selectColor } from "../../../logic/selectColor";

export default function Title({ activityName }: { activityName: string }) {
  return (
    <div className="tituleActivityDiv">
      <h2
        style={{ borderBottom: `2px solid ${selectColor(activityName)}` }}
        className="tituleActivityH2"
      >
      {activityName}
      </h2>
    </div>
  );
}
