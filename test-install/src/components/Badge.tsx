export const Badge = ({ children, color }: { children: React.ReactNode, color: 'green' | 'gray' }) => {
  const styles = color === 'green' 
    ? "bg-green-500/10 text-green-400 border-green-500/20"
    : "bg-gray-800 text-gray-400 border-gray-700";
    
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles}`}>
      {children}
    </span>
  );
}