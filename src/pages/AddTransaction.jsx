import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "dépense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle transaction :", form);
    alert("Transaction ajoutée avec succès !");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Ajouter une transaction</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg w-full max-w-lg">
          <div className="mb-4">
            <label className="block mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="revenu">Revenu</option>
              <option value="dépense">Dépense</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Montant (€)</label>
            <input name="amount" type="number" value={form.amount} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Catégorie</label>
            <input name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Ajouter
          </button>
        </form>
      </main>
    </div>
  );
}
