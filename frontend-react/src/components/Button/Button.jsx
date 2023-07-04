import "./Button.css";

function Button({ text, classNames, handleClick }) {
  return (
    <button className={`custom-btn ${classNames}`} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
