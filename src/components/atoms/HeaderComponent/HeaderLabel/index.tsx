// Atoms/Label.tsx
import { motion } from "framer-motion";
import React from "react";

export const HeaderLabel: React.FC<{
  text: string;
  textStickyLeftPX?: number;
}> = ({ text, textStickyLeftPX = 208 }) => (
  <motion.label
    className="px-4 sticky top-0"
    initial={{
      left: 0,
    }}
    animate={{
      left: textStickyLeftPX,
    }}
    exit={{
      left: 0,
    }}
  >
    {text}
  </motion.label>
);
