import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiUser, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeProvider";

const ServiceCard = ({ service }) => {
  const { isDark } = useTheme();
  const {
    _id,
    serviceName,
    category,
    price,
    description,
    imageUrl,
    providerName,
    averageRating = 0,
    reviews = [],
  } = service;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
        isDark ? "bg-slate-800" : "bg-white"
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "https://via.placeholder.com/400x300?text=Service+Image"}
          alt={serviceName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Service+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 backdrop-blur-sm text-sm font-semibold rounded-full ${
          isDark ? "bg-slate-900/80 text-primary-400" : "bg-white/90 text-primary-600"
        }`}>
          {category}
        </span>

        {/* Price Badge */}
        <div className={`absolute bottom-4 right-4 px-3 py-1 backdrop-blur-sm rounded-lg ${
          isDark ? "bg-slate-900/80" : "bg-white/90"
        }`}>
          <div className={`flex items-center gap-1 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            <span className="text-green-500">$</span>
            {price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-lg font-bold line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {serviceName}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <FiStar className="text-yellow-400 fill-current" />
            <span className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {averageRating.toFixed(1)}
            </span>
            {reviews.length > 0 && (
              <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                ({reviews.length})
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`mb-4 line-clamp-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>

        {/* Provider */}
        <div className={`flex items-center gap-2 mb-4 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          <FiUser className="text-primary-500" />
          <span>by {providerName}</span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/services/${_id}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:scale-[1.02]"
        >
          View Details
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
