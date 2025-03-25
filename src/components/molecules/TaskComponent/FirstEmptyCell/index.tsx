import { motion } from "framer-motion";
import { useStylesStore } from "../../../../stores";

type Props = {
  index: number;
  startPercentage: number;
};

function FirstEmptyCell({ index, startPercentage }: Props) {
  const { customCellWidthPX } = useStylesStore();

  return (
    <motion.div
      key={index}
      className="h-full flex"
      animate={{ width: `${customCellWidthPX * (startPercentage / 100)}px` }}
    />
  );
}

export { FirstEmptyCell };
