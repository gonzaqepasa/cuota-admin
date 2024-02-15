import { firstLetterUpper } from "../../../logic/firstLetterUpper";

interface Props {
  label?: string;
  val?: string;
  modality?: string;
  color?: string;
}

const TextUserPanel: React.FC<Props> = ({
  label,
  val = "",
  modality = "",
  color,
}) => {
  return (
    <div className=" justify-start w-10/12">
      <label className={`font-normal text-sm text-neutral-500`}>{label}</label>
      <p className={`pl-1 text-sm font-normal  `}>{firstLetterUpper(val)}</p>
      <p className={`text-sm pl-1 font-medium`} style={{ color: color }}>
        {firstLetterUpper(modality)}
      </p>
    </div>
  );
};

export default TextUserPanel;
