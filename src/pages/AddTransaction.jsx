
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { addTransaction, getCategories } from "../api/api";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "DEPENSE",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log("📂 Réponse du backend (catégories):", res);

        // ✅ on accepte plusieurs formats de réponse possibles
        const data =
          res.data?.data?.categories ||
          res.data?.data ||
          res.data ||
          [];

        if (data.length > 0) {
          setCategories(data);
        } else {
          // ✅ fallback local si l’API est vide
          setCategories([
            { _id: "1", name: "Loyer" },
            { _id: "2", name: "Courses" },
            { _id: "3", name: "Transport" },
            { _id: "4", name: "Divertissement" },
            { _id: "5", name: "Salaire" },
          ]);
        }
      } catch (err) {
        console.error("❌ Erreur catégories :", err.response?.data || err);
        alert("Impossible de charger les catégories depuis le serveur ❌");

        // ✅ fallback manuel si l’appel échoue
        setCategories([
          { _id: "1", name: "Loyer" },
          { _id: "2", name: "Courses" },
          { _id: "3", name: "Transport" },
          { _id: "4", name: "Divertissement" },
          { _id: "5", name: "Salaire" },
        ]);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.name === form.category || cat._id === form.category
    );

    const payload = {
      ...form,
      type: form.type.toUpperCase(), // ✅ correspond au format du back
      category: selectedCategory ? selectedCategory._id : form.category, // ✅ envoie _id
    };

    console.log("📤 Données envoyées :", payload);

    try {
      await addTransaction(payload);
      alert("Transaction ajoutée avec succès ✅");
      setForm({
        type: "DEPENSE",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error("❌ Erreur ajout :", err.response?.data || err);
      alert(err.response?.data?.message || "Erreur lors de l’ajout ❌");
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
              <option value="REVENUE">Revenu</option>
              <option value="DEPENSE">Dépense</option>
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
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
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







