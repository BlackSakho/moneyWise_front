import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../api/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  // 🔹 Charger les transactions depuis ton backend
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await getTransactions();
      console.log("📦 Réponse du backend :", res);

      // ✅ Adaptation à la structure réelle du backend
      const data =
        res.data?.data?.transactions ||
        res.data?.data ||
        res.data ||
        [];

      if (!Array.isArray(data)) {
        console.warn("⚠️ Données inattendues :", data);
        setTransactions([]);
      } else {
        setTransactions(data);
      }
    } catch (err) {
      console.error("❌ Erreur de chargement :", err.response?.data || err);
      alert("Impossible de récupérer les transactions ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 🗑 SUPPRESSION
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette transaction ?")) return;
    try {
      await deleteTransaction(id);
      alert("Transaction supprimée ✅");
      fetchTransactions();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression ❌");
    }
  };

  // ✏️ ÉDITION
  const handleEditClick = (t) => {
    setEditing(t._id);
    setForm({
      type: t.type?.toLowerCase() === "revenue" ? "revenu" : "dépense",
      amount: t.amount,
      category: t.category?.name || t.category || "",
      description: t.description,
      date: t.date?.slice(0, 10) || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...form,
        type: form.type.toUpperCase(), // ✅ aligné avec le back
      };

      console.log("📝 Données envoyées :", updatedData);

      await updateTransaction(editing, updatedData);
      alert("Transaction modifiée ✅");
      setEditing(null);
      fetchTransactions();
    } catch (err) {
      console.error("Erreur modification :", err.response?.data || err);
      alert("Erreur lors de la mise à jour ❌");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Chargement des transactions...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Toutes les transactions</h1>

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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Aucune transaction trouvée 😔
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {t.type === "REVENUE" ? "Revenu" : "Dépense"}
                  </td>
                  <td
                    className={`p-3 ${
                      t.type === "REVENUE"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {t.type === "REVENUE" ? "+" : "-"}
                    {t.amount} €
                  </td>
                  <td className="p-3">
                    {t.category?.name || t.category || "—"}
                  </td>
                  <td className="p-3">{t.description}</td>
                  <td className="p-3">
                    {t.date
                      ? new Date(t.date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(t)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 🧾 Fenêtre modale d’édition */}
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
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
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
                    name="amount"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Catégorie</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Description</label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
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









