import { motion } from "framer-motion";




const Footer = () => {
  return(
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900 text-gray-400 text-center py-6"
      >
        <p>© 2025 MoneyWise — Tous droits réservés</p>
        <div className="flex justify-center space-x-6 mt-3">
          <a href="#" className="hover:text-white">Confidentialité</a>
          <a href="#" className="hover:text-white">Conditions</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </motion.footer>
  )
}

export default Footer;

      