import React from "react";

export default function TransactionList({ transactions = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="mb-3 font-semibold">Dernières transactions</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b pb-2">
            <th>Type</th><th>Montant</th><th>Catégorie</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-b py-2">
              <td>{t.type}</td>
              <td>{t.type === "revenu" ? `+${t.amount} €` : `-${t.amount} €`}</td>
              <td>{t.category}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
