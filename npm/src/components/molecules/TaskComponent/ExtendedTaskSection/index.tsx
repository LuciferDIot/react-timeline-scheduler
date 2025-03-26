import { motion } from "framer-motion";

type ExtendedTaskSectionProps = {
  percentage: number;
  extendedStyles: {
    borderColor: string;
    backgroundColor: string;
  };
};

export const ExtendedTaskSection = ({
  percentage,
  extendedStyles,
}: ExtendedTaskSectionProps) => (
  <motion.div
    className="border border-dashed"
    style={extendedStyles}
    initial={{ scale: 0.9, width: `${100 - percentage}%` }}
    animate={{ scale: 1, width: `${100 - percentage}%` }}
    exit={{ width: `${(100 - percentage) / 2}%` }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />
);
