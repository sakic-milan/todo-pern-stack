import "./Button.css";

const Button = ({ text, onClick }) => {
  return (
    <button className="windowButton" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
