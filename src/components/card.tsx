import {} from "react";
import { ComponentProps } from "src/types/component";

const Card = ({ children }: ComponentProps) => {
  return <div className="bg-white-300 w-fit h-fit py-4 px-6">{children}</div>;
};

export default Card;
