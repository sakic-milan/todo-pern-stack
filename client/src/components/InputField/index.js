import "./InputField.css";

const InputField = ({ value, handleChange }) => {
  return <input className="inputField" value={value} onChange={handleChange} />;
};

export default InputField;
