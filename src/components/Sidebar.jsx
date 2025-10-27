import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 p-6 bg-gray-100 shadow h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6">💰 MoneyWise</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:bg-green-700  font-bold py-2 px-4 rounded">🏠 Dashboard</Link>
        <Link to="/transactions" className="text-gray-700">💸 Trasactions</Link>
        <Link to="/add" className="text-gray-700">➕ Ajouter un trasaction</Link>
        <Link to="/profile" className="text-gray-700">👤 Profil</Link>
        <Link to="/login" className="text-red-500">🚪 Déconnexion</Link>
      </nav>
    </aside>
  );
}
