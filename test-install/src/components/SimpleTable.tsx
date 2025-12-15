
export const SimpleTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (React.ReactNode[])[];
}) => (
  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#030712]">
    <table className="w-full text-left text-sm text-gray-400">
      <thead className="bg-[#111827] text-xs uppercase text-gray-200">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-6 py-4">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-white/5">
            {row.map((cell, j) => (
              <td key={j} className="px-6 py-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

