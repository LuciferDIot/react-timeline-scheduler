type TaskLabelProps = {
  label: string;
};

export const TaskLabel = ({ label }: TaskLabelProps) => (
  <label className="sticky left-52 top-0 px-5">{label}</label>
);
