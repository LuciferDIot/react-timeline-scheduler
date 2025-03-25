// Atoms/Label.tsx
import { motion } from "framer-motion";
import React from "react";
import { useStylesStore } from "../../../../stores";

export const HeaderLabel: React.FC<{
  text: string;
}> = ({ text }) => {
  const { additionalStickyLeft, rowLableMaxWidth } = useStylesStore();

  return (
    <motion.label
      className="px-4 sticky top-0"
      initial={{
        left: 0,
      }}
      animate={{
        left: rowLableMaxWidth + additionalStickyLeft || 208,
      }}
      exit={{
        left: 0,
      }}
    >
      {text}
    </motion.label>
  );
};
