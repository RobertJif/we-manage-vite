import {} from "react";
import { ComponentProps } from "src/types/component";
type ButtonProps = ComponentProps & {
  text: string;
};
const Button = ({ text }: ButtonProps) => {
  return (
    <button className="bg-primary-100 text-white-100 font-bold py-2 px-4 rounded">
      {text}
    </button>
  );
};

export default Button;
