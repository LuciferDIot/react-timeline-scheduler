import { IoIosAdd, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IconProps {
  name: "back" | "forward" | "add";
  size?: number;
}

export const StripActionIcon: React.FC<IconProps> = ({ name, size = 14 }) => {
  switch (name) {
    case "back":
      return <IoIosArrowBack size={size} />;
    case "forward":
      return <IoIosArrowForward size={size} />;
    case "add":
      return <IoIosAdd size={size} />;
    default:
      return null;
  }
};
