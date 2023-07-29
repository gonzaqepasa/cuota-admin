import allAdmin from "../../../config/activesAdmin";

interface Props {}

const FilterAdmin: React.FC<Props> = () => {
  return (
    <div>
      <select name="" id="">
        {allAdmin.map((el, i) => (
          <option key={i}>{el}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterAdmin;
