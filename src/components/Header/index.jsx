import React, { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // ✅ Vérifie si un token existe dans le localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Déconnexion réussie ✅");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">💸 MoneyWise</div>

        {/* Menu hamburger (mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-8 text-gray-700 items-center">
          <a href="/" className="hover:text-green-500 transition">
            Accueil
          </a>
          <a href="/#apropos" className="hover:text-green-500 transition">
            À propos
          </a>
          <a href="/#contact" className="hover:text-green-500 transition">
            Contact
          </a>

          {/* Boutons conditionnels selon connexion */}
          {isLoggedIn ? (
            <>
              <a
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                Tableau de bord
              </a>
              <button
                onClick={handleLogout}
                className="ml-3 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
            >
              Se connecter
            </a>
          )}
        </nav>
      </div>

      {/* Menu mobile (affiché quand hamburger ouvert) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white border-t border-gray-200 pb-4 space-y-3">
          <a
            href="/"
            className="text-gray-700 hover:text-green-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </a>
          <a
            href="/#apropos"
            className="text-gray-700 hover:text-green-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            À propos
          </a>
          <a
            href="/#contact"
            className="text-gray-700 hover:text-green-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          {isLoggedIn ? (
            <>
              <a
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Tableau de bord
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Se connecter
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


