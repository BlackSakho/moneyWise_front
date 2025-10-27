import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const [categories, setCategories] = useState(["Loyer", "Courses", "Transport"]);
  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    if (newCat.trim() !== "") {
      setCategories([...categories, newCat]);
      setNewCat("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Profil utilisateur</h1>

        <div className="bg-white shadow p-6 rounded-lg w-full max-w-lg">
          <h2 className="font-semibold mb-3">Catégories personnalisées</h2>

          <ul className="mb-4">
            {categories.map((cat, i) => (
              <li key={i} className="flex justify-between border-b py-1">
                {cat}
                <button className="text-red-500 hover:underline" onClick={() => setCategories(categories.filter(c => c !== cat))}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <input
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="Nouvelle catégorie"
              className="border p-2 rounded flex-1"
            />
            <button onClick={addCategory} className="bg-green-600 text-white px-4 py-2 rounded">
              Ajouter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
