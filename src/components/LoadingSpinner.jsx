import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeProvider";

const LoadingSpinner = ({ fullScreen = true }) => {
  const { isDark } = useTheme();

  const spinner = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <div className="relative">
        <div
          className={`w-16 h-16 border-4 rounded-full ${
            isDark ? "border-primary-900/30" : "border-primary-200"
          }`}
        ></div>
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className={`mt-4 font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading...
      </p>
    </motion.div>
  );

  if (!fullScreen) {
    return <div className="flex items-center justify-center py-12">{spinner}</div>;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
