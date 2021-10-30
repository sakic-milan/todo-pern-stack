import "./WindowsProgram.css";

const WindowsProgram = ({ children }) => {
  return (
    <div className="windowWrapper">
      <div className="windowHeader">
        <span>PERN Stack Todo App</span>
        <span className="closeButton" onClick={() => {}}></span>
      </div>
      {children}
    </div>
  );
};

export default WindowsProgram;
