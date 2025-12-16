import { motion } from "framer-motion";
import { useStylesStore } from "../../../stores";

type Props = {
  percentage: number;
};

function Progressbar({ percentage }: Props) {
  const { theme } = useStylesStore();
  
  return (
    <motion.div
      style={{
        backgroundColor: theme.progressBar?.background || "#10b981",
      }}
      className="absolute bottom-0 left-0 h-1 w-full"
      initial={{ width: "100%" }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 0.5 }}
    />
  );
}

export { Progressbar };
