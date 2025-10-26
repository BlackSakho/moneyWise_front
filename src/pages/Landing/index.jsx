import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 bg-gray-200">
        {/* Texte gauche */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Gérer vos finances n’a jamais été aussi simple !
          </h1>
          <ul className="text-gray-700 space-y-2 mb-8">
            <li>✔️ Suivez vos dépenses et revenus</li>
            <li>✔️ Visualisez vos finances en graphiques clairs</li>
            <li>✔️ Exportez vos données en PDF ou Excel</li>
          </ul>
          <a
            href="/register"
            className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full shadow hover:shadow-md hover:bg-gray-50 transition"
          >
            Commencer maintenant
          </a>
        </motion.div>

        {/* Image droite */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="w-80 h-56 bg-white border-2 border-gray-400"></div>
        </motion.div>
      </section>

      {/* POURQUOI MONEYWISE */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center py-16 px-6 md:px-20 bg-white"
      >
        <h2 className="text-3xl font-bold mb-6">Pourquoi choisir MoneyWise ?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Contrairement aux applications complexes, MoneyWise se concentre sur la simplicité
          et la clarté. Vos finances, organisées en un clin d’œil.
        </p>
      </motion.section>

      {/* FONCTIONNALITÉS */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Nos fonctionnalités clés</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 text-center">
          {[
            { icon: "💰", title: "Suivi des transactions", text: "Ajoutez facilement vos revenus et dépenses." },
            { icon: "📊", title: "Visualisation graphique", text: "Analysez votre budget par catégorie." },
            { icon: "🧾", title: "Export PDF / Excel", text: "Gardez vos rapports à portée de main." },
            { icon: "⚙️", title: "Catégories personnalisées", text: "Adaptez MoneyWise à votre vie." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 md:px-20 bg-white text-center"
      >
        <h2 className="text-3xl font-bold mb-12">Ils nous font confiance</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {[
            { text: "Grâce à MoneyWise, j’ai enfin compris où partait mon argent.", name: "— Awa, Étudiante" },
            { text: "Une application claire et efficace. Je la recommande à 100 % !", name: "— Mamadou, Freelance" },
            { text: "MoneyWise m’a aidé à épargner sans stress.", name: "— Fatou, Employée" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 italic mb-4">“{item.text}”</p>
              <p className="font-semibold text-gray-800">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 md:px-20 bg-green-500 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Rejoignez MoneyWise dès aujourd’hui</h2>
        <p className="mb-8">
          Créez votre compte gratuitement et commencez à gérer votre budget dès maintenant.
        </p>
        <a
          href="/register"
          className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          S’inscrire gratuitement
        </a>
      </motion.section>

      
    </div>
  );
}
