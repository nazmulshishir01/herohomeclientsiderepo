import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiEye } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyServices = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchMyServices();
  }, [user]);

  const fetchMyServices = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/my-services?email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: `Are you sure you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("access-token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(services.filter(s => s._id !== id));
        Swal.fire("Deleted!", "Service has been deleted.", "success");
      } catch (error) {
        toast.error("Failed to delete service");
      }
    }
  };

  if (loading) return <LoadingSpinner fullScreen={false} />;

  return (
    <>
      <Helmet><title>My Services - HomeHero</title></Helmet>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>My Services</h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>Manage your service listings</p>
          </div>
          <Link to="/dashboard/add-service" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            <FiPlus /> Add New Service
          </Link>
        </div>

        {services.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <div className="text-6xl mb-4">📦</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No Services Yet</h2>
            <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Start by adding your first service</p>
            <Link to="/dashboard/add-service" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold">
              <FiPlus /> Add Service
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className={`hidden lg:block rounded-xl shadow-lg overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <table className="w-full">
                <thead className={isDark ? "bg-slate-700" : "bg-gray-50"}>
                  <tr>
                    {["Service", "Category", "Price", "Rating", "Actions"].map((h) => (
                      <th key={h} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-700" : "divide-gray-200"}`}>
                  {services.map((service, index) => (
                    <motion.tr key={service._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-50"}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={service.imageUrl || "https://via.placeholder.com/60"} alt={service.serviceName} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{service.serviceName}</p>
                            <p className={`text-sm line-clamp-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{service.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? "bg-primary-900/30 text-primary-400" : "bg-primary-100 text-primary-600"}`}>{service.category}</span></td>
                      <td className="px-6 py-4"><span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${service.price}</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-current" /><span className={isDark ? "text-gray-300" : "text-gray-700"}>{service.averageRating?.toFixed(1) || "0.0"}</span></div></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/services/${service._id}`} className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-600 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`} title="View"><FiEye /></Link>
                          <Link to={`/dashboard/update-service/${service._id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="Edit"><FiEdit2 /></Link>
                          <button onClick={() => handleDelete(service._id, service.serviceName)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete"><FiTrash2 /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid gap-4">
              {services.map((service) => (
                <motion.div key={service._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl shadow-lg p-4 ${isDark ? "bg-slate-800" : "bg-white"}`}>
                  <div className="flex gap-4 mb-4">
                    <img src={service.imageUrl || "https://via.placeholder.com/80"} alt={service.serviceName} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{service.serviceName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${isDark ? "bg-primary-900/30 text-primary-400" : "bg-primary-100 text-primary-600"}`}>{service.category}</span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary-500">${service.price}</span>
                        <div className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-current text-sm" /><span className="text-sm">{service.averageRating?.toFixed(1) || "0.0"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/services/${service._id}`} className="flex-1 py-2 text-center rounded-lg bg-gray-100 dark:bg-slate-700 text-sm font-medium">View</Link>
                    <Link to={`/dashboard/update-service/${service._id}`} className="flex-1 py-2 text-center rounded-lg bg-blue-500 text-white text-sm font-medium">Edit</Link>
                    <button onClick={() => handleDelete(service._id, service.serviceName)} className="flex-1 py-2 text-center rounded-lg bg-red-500 text-white text-sm font-medium">Delete</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyServices;
