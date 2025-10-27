import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifie si l'utilisateur est connecté via le localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          💸 MoneyWise
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <a href="/" className="hover:text-green-500 transition">
            Accueil
          </a>
          <a href="#about" className="hover:text-green-500 transition">
            À propos
          </a>
          <a href="#contact" className="hover:text-green-500 transition">
            Contact
          </a>
        </nav>

        {/* Bouton Connexion (affiché uniquement si non connecté) */}
        {!isLoggedIn && (
          <a
            href="/login"
            className="hidden md:inline-block bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Se connecter
          </a>
        )}

        {/* Bouton menu mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <nav className="flex flex-col text-gray-700 px-6 py-4 space-y-3">
            <a href="/" className="hover:text-green-500 transition">
              Accueil
            </a>
            <a href="#about" className="hover:text-green-500 transition">
              À propos
            </a>
            <a href="#contact" className="hover:text-green-500 transition">
              Contact
            </a>

            {/* Bouton "Se connecter" uniquement si non connecté */}
            {!isLoggedIn && (
              <a
                href="/login"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-center hover:bg-gray-300 transition"
              >
                Se connecter
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;



//flex flex-col md:flex-row items-center justify-between px-2 md:px-4 py-3 bg-gray-200