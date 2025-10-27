import React from "react";

export default function BalanceCard({ balance = 0, income = 0, expense = 0 }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Solde total : {balance} €</h2>
      <div className="flex gap-6">
        <div className="text-green-600">Revenus : +{income} €</div>
        <div className="text-red-500">Dépenses : -{expense} €</div>
      </div>
    </div>
  );
}
