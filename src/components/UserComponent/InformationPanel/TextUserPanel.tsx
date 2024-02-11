import { selectColor } from "../../../logic/selectColor";

interface Props {
  label?: string;
  val?: string;
  modality?: string;
}

const TextUserPanel: React.FC<Props> = ({ label, val, modality }) => {
  return (
    <div className=" justify-start w-10/12">
      <label className={`font-medium text-sm text-neutral-500`}>{label}</label>
      <p className={`pl-1 text-sm font-medium  `}>{val}</p>
      <p
        className={`text-sm pl-1 font-medium`}
        style={{ color: selectColor(String(val)) }}
      >
        {modality}
      </p>
    </div>
  );
};

export default TextUserPanel;
