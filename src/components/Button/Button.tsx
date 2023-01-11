import * as Styled from "./Button.styled";

type IconClass = "close" | "bookmark";

interface ButtonProps {
  iconClass: IconClass;
}

function Button({ iconClass }: ButtonProps) {
  function getIconClass() {
    if (iconClass === "close") return "fa-solid fa-xmark fa-md";
    return;
  }
  return <Styled.Button></Styled.Button>;
}

export default Button;
