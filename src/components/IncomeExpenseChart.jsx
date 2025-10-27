import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function IncomeExpenseChart({ data = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="mb-2 font-semibold">Évolution mensuelle</h3>
      <BarChart width={480} height={240} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" name="Revenu" fill="#4CAF50" />
        <Bar dataKey="expense" name="Dépense" fill="#F44336" />
      </BarChart>
    </div>
  );
}
