import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#2563eb"];

export default function IssuePieChart({ data }) {
  
  const total = data.resolved + data.pending + data.progress;

  const pieData = [
    { name: `Resolved (${data.resolved})`, value: data.resolved },
    { name: `Pending (${data.pending})`, value: data.pending },
    { name: `In Progress (${data.progress})`, value: data.progress },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4 text-blue-700">
        🥧 Issue Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={100} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}