import { motion } from "framer-motion";

type Props = {
  percentage: number;
};

function Progressbar({ percentage }: Props) {
  return (
    <motion.div
      style={{
        backgroundColor: "#35FF9D",
      }}
      className="absolute bottom-0 left-0 h-1 w-full"
      initial={{ width: "100%" }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 0.5 }}
    />
  );
}

export { Progressbar };
