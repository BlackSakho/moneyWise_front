import React from "react"

const Header = () => {
  return (
     <div className="flex flex-col md:flex-row items-center justify-between px-2 md:px-4 py-3 bg-gray-200">
            <div className="text-2xl font-bold text-gray-800">💸 MoneyWise</div>
            <nav className="hidden md:flex space-x-8 text-gray-700">
              <a href="/" className="hover:text-green-500 transition">Accueil</a>
              <a href="#" className="hover:text-green-500 transition">À propos</a>
              <a href="#" className="hover:text-green-500 transition">Contact</a>
            </nav>
            <a
              href="/login"
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
            >
              Se connecter
            </a>
    </div>
 

)
}
export default Header