import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { addTransaction, getCategories } from "../api/api";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "dépense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  // Charger les catégories depuis ton API
 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log("📂 Réponse du backend (catégories):", res);

        

const data = res.data?.data?.categories || [];
setCategories(data);
        setCategories(data);
      } catch (err) {
        console.error("❌ Erreur catégories :", err.response?.data || err);
        alert("Impossible de charger les catégories ❌");
      }
    };

    fetchCategories();
  }, []);


    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(form);
      alert("Transaction ajoutée avec succès ✅");
      setForm({
        type: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error("❌ Erreur ajout :", err.response?.data || err);
      alert("Erreur lors de l’ajout ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Ajouter une transaction</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md"
        >
          <div>
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Choisir --</option>
              <option value="revenu">Revenu</option>
              <option value="dépense">Dépense</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Montant (€)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Catégorie</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Aucune catégorie trouvée</option>
              )}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enregistrer
          </button>
        </form>
      </main>
    </div>
  );
}
