import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedButtonProps = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export const AnimatedButton = ({
  onClick,
  children,
  className,
}: AnimatedButtonProps) => (
  <motion.button
    className={
      className
        ? className
        : "group-hover:flex hidden w-full h-full rounded-lg bg-gray-200/50 justify-center items-center backdrop-blur-md"
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
