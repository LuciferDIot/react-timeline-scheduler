import { motion } from "framer-motion";
import { useStylesStore } from "../../../stores";

type TaskLabelProps = {
  label: string;
  addExtraLeft?: number;
};

export const TaskLabel = ({ label, addExtraLeft = 0 }: TaskLabelProps) => {
  const { additionalStickyLeft, rowLableMaxWidth } = useStylesStore();

  return (
    <motion.label
      key={rowLableMaxWidth + additionalStickyLeft || 208}
      className={`z-[5] h-full sticky top-0 flex justify-start items-center px-5`}
      initial={{
        left: 0,
      }}
      animate={{
        left: rowLableMaxWidth + additionalStickyLeft || 208,
        marginLeft: addExtraLeft,
      }}
      exit={{
        left: 0,
      }}
    >
      {label}
    </motion.label>
  );
};
