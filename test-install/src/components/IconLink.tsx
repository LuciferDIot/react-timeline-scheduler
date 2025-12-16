import { FaGithub, FaNpm } from "react-icons/fa";

export const IconLinks = ({ borderSide }: { borderSide: "Left" | "Right" }) => {
  return (
    <div className={`flex items-center gap-3 ${borderSide === "Left" ? "border-r border-white/10 pr-4 mr-4" : "border-l border-white/10 pl-4 ml-2"}`}>
      <a
        href="https://github.com/luciferdiot/react-timeline-scheduler"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <FaGithub size={20} />
      </a>
      <a
        href="https://www.npmjs.com/package/react-timeline-scheduler"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#CB3837] transition-colors"
      >
        <FaNpm size={24} />
      </a>
    </div>
  );
};