import "../../App.css";
import { MdMinimize } from "react-icons/md";
const SchemaDropdown = ({ value, onRemove, options, addedValue }) => {
 
  return (
    <>
      <select onChange={(e) => e.target.value}>
        <option> {value}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MdMinimize
        onClick={() => onRemove(value, addedValue)}
        className="removeIcon"
      />
    </>
  );
};

export default SchemaDropdown;
