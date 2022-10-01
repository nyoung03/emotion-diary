const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "default", "negative"].includes(type)
    ? type
    : "default";
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
