import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // 👉 Simule un appel API (à remplacer par ton backend plus tard)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
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

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full shadow transition 
              ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-900"}
            `}
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          <a href="/login" className="text-green-600 hover:underline">
            Retour à la connexion
          </a>
        </p>
      </div>
    </motion.div>
  );
}
