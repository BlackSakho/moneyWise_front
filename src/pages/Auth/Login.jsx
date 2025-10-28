// src/pages/Login/index.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { loginUser } from "../../api/api";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await loginUser(data);
localStorage.setItem("token", res.data.token);
      alert("Connexion réussie !");
      window.location.href = "/dashboard";
    } catch (error) {
      setServerError(error.response?.data?.message || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gray-200 rounded-lg shadow-lg p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-8">MONEYWISE</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "L'email est requis" })}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Mot de passe"
            {...register("password", { required: "Le mot de passe est requis" })}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full shadow transition ${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-900"
            }`}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            S’inscrire
          </a>
        </p>
      </div>
    </motion.div>
  );
}
