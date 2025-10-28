// src/pages/Register/index.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { registerUser } from "../../api/api";

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const password = watch("password");

 const onSubmit = async (data) => {
  setLoading(true);
  setServerError("");

  try {
    // 🔹 On sépare le nom complet en prénom + nom
    const [prenom, ...rest] = data.name.split(" ");
    const nom = rest.join(" ") || prenom;

    // 🔹 On crée un "FormData" car le backend attend multipart/form-data
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", ""); // vide pour le moment

    await registerUser(formData);

    alert("Compte créé avec succès ✅");
    window.location.href = "/login";
  } catch (error) {
    console.error(error);
    setServerError(error.response?.data?.message || "Erreur lors de l'inscription ❌");
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
            type="text"
            placeholder="Nom complet"
            {...register("name", { required: "Le nom est requis" })}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: { value: 6, message: "6 caractères minimum" },
            })}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Les mots de passe ne correspondent pas",
            })}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full shadow transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Déjà un compte ?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </motion.div>
  );
}
