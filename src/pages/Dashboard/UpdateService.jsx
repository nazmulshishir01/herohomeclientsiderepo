import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiDollarSign, FiImage, FiTag, FiFileText, FiUser, FiMail, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const UpdateService = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({ serviceName: "", category: "", price: "", description: "", imageUrl: "" });

  const categories = ["House Cleaning", "Cleaning", "Plumbing", "Electrical", "Gardening", "Painting", "Carpentry", "HVAC", "Pest Control", "Moving Services", "Appliance Repair", "Roofing", "Flooring", "Window Cleaning"];

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const service = response.data;
      if (service.providerEmail !== user?.email) {
        toast.error("You can only edit your own services");
        navigate("/dashboard/my-services");
        return;
      }
      setFormData({
        serviceName: service.serviceName || "",
        category: service.category || "",
        price: service.price || "",
        description: service.description || "",
        imageUrl: service.imageUrl || ""
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load service");
      navigate("/dashboard/my-services");
    } finally {
      setPageLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.serviceName || !formData.category || !formData.price || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access-token");
      const serviceData = {
        serviceName: formData.serviceName,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        imageUrl: formData.imageUrl || "https://via.placeholder.com/400x300",
        providerName: user?.displayName || "Service Provider",
        providerEmail: user?.email
      };

      await axios.patch(`${import.meta.env.VITE_API_URL}/services/${id}?email=${user?.email}`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Service updated successfully!");
      navigate("/dashboard/my-services");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <>
      <Helmet><title>Update Service - HomeHero</title></Helmet>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate("/dashboard/my-services")} className={`p-2 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`}>
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Update Service</h1>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>Edit your service details</p>
            </div>
          </div>

          <div className={`rounded-2xl shadow-xl p-6 md:p-8 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Service Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="serviceName" value={formData.serviceName} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} required />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Category <span className="text-red-500">*</span></label>
                <select name="category" value={formData.category} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} required>
                  <option value="">Select a category</option>
                  {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Price (USD) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} step="0.01" min="0" required />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 resize-none ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} required />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Service Image URL</label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} />
                </div>
              </div>

              {formData.imageUrl && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Image Preview</label>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" onError={(e) => { e.target.src = "https://via.placeholder.com/400x300"; }} />
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Updating...</> : "Update Service"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UpdateService;
