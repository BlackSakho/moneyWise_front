
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpensePieChart({ data = [] }) {
  const COLORS = ["#4CAF50", "#FF7043", "#42A5F5", "#AB47BC", "#FFC107"];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="mb-2 font-semibold">Répartition des dépenses</h3>
      <PieChart width={280} height={240}>
        <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
          {data.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

