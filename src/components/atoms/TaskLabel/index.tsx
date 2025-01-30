import { motion } from "framer-motion";

type TaskLabelProps = {
  label: string;
  textStickyLeftPX?: number;
};

export const TaskLabel = ({
  label,
  textStickyLeftPX = 208,
}: TaskLabelProps) => {
  console.log(textStickyLeftPX);

  return (
    <motion.label
      key={textStickyLeftPX}
      className={`sticky top-0 px-5`}
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
      {label}
    </motion.label>
  );
};
