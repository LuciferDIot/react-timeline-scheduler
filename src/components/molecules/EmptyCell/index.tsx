import { motion } from "framer-motion";
import { TaskColors } from "../../../data";

type Props = {
  cellWidthPX: number;
  cellHeightPX: number;
  rowIndex: number;
};

function EmptyCell({ cellHeightPX, cellWidthPX, rowIndex }: Props) {
  return (
    <motion.div
      className="flex-1 border p-2"
      initial={{ width: `${cellWidthPX}px`, scale: 0.8 }}
      animate={{
        width: `${cellWidthPX}px`,
        height: `${cellHeightPX}px`,
        backgroundColor:
          rowIndex % 2 === 0 ? TaskColors.ROW_EVEN : TaskColors.ROW_ODD,
        scale: 1,
      }}
      exit={{ width: `${cellWidthPX / 2}px` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
}

export default EmptyCell;
