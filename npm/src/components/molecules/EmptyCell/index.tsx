import { motion } from "framer-motion";
import { TaskColors } from "../../../data";
import { useStylesStore } from "../../../stores";

type Props = {
  rowIndex: number;
  borderColor: string;
};

export function EmptyCell({ rowIndex, borderColor }: Props) {
  const { customCellHeightPX, customCellWidthPX } = useStylesStore();
  return (
    <motion.div
      className={`flex-1 border p-2 ${borderColor}`}
      initial={{ width: `${customCellWidthPX}px`, scale: 0.8 }}
      animate={{
        width: `${customCellWidthPX}px`,
        height: `${customCellHeightPX}px`,
        backgroundColor:
          rowIndex % 2 === 0 ? TaskColors.ROW_EVEN : TaskColors.ROW_ODD,
        scale: 1,
      }}
      exit={{ width: `${customCellWidthPX / 2}px` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
}
