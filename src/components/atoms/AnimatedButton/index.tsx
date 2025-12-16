import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useStylesStore } from "../../../stores";

type AnimatedButtonProps = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export const AnimatedButton = ({
  onClick,
  children,
  className,
}: AnimatedButtonProps) => {
  const { theme } = useStylesStore();
  

  const defaultOpacity = "0.3";
  
  return (
    <motion.button
      className={
        className
          ? className
          : "group-hover:flex hidden w-full h-full rounded-lg justify-center items-center backdrop-blur-md"
      }
      style={
        !className
          ? {
              backgroundColor: `rgba(${
                theme.background.primary === "#ffffff" ? "200, 200, 200" : "100, 100, 100"
              }, ${defaultOpacity})`,
            }
          : undefined
      }
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};
