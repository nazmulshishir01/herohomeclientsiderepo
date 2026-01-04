import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeProvider";

const ErrorPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Helmet><title>404 - Page Not Found | HomeHero</title></Helmet>
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-primary-50 via-white to-primary-50"}`}>
        <div className="text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.8 }}>
            <div className="relative mb-8">
              <motion.span animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-[150px] md:text-[200px] font-black bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">404</motion.span>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">🏠</motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Page Not Found</h1>
            <p className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Oops! The page you're looking for doesn't exist or has been moved.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all"><FiHome /> Go to Home</Link>
            <button onClick={() => navigate(-1)} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${isDark ? "bg-slate-700 text-gray-300 hover:bg-slate-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}><FiArrowLeft /> Go Back</button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-12">
            <p className={`text-sm mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Or try these helpful links:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[{ to: "/services", label: "Services" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map((link) => (
                <Link key={link.to} to={link.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? "bg-slate-800 text-gray-300 hover:bg-slate-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{link.label}</Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
