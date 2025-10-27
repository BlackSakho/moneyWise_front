import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "revenu", amount: 300, category: "Freelance", description: "Projet Web", date: "2025-10-01" },
    { id: 2, type: "dépense", amount: 50, category: "Courses", description: "Supermarché", date: "2025-10-02" },
    { id: 3, type: "dépense", amount: 20, category: "Transport", description: "Bus", date: "2025-10-03" },
  ]);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: "", amount: "", category: "", description: "", date: "" });

  // 🗑 Supprimer une transaction
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette transaction ?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  // ✏️ Modifier une transaction
  const handleEditClick = (t) => {
    setEditing(t.id);
    setForm({
      type: t.type,
      amount: t.amount,
      category: t.category,
      description: t.description,
      date: t.date,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTransactions(
      transactions.map((t) =>
        t.id === editing ? { ...t, ...form } : t
      )
    );
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Transactions</h1>

        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Montant</th>
              <th className="p-3 text-left">Catégorie</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.type}</td>
                <td className={`p-3 ${t.type === "revenu" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "revenu" ? "+" : "-"}{t.amount} €
                </td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(t)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Fenêtre modale pour modifier */}
        {editing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Modifier la transaction</h2>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div>
                  <label className="block mb-1">Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border p-2 rounded"
                  >
                    <option value="revenu">Revenu</option>
                    <option value="dépense">Dépense</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Montant (€)</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Catégorie</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Description</label>
                  <input
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
