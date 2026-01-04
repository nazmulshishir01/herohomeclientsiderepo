import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProviderBookings = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchProviderBookings();
  }, [user]);

  const fetchProviderBookings = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/provider-bookings?email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("access-token");
      await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status } : b));
      toast.success(`Booking ${status}!`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <LoadingSpinner fullScreen={false} />;

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    completed: bookings.filter(b => b.status === "completed").length,
    revenue: bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + (b.price || 0), 0)
  };

  return (
    <>
      <Helmet><title>Received Bookings - HomeHero</title></Helmet>
      <div>
        <div className="mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Received Bookings</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Manage bookings for your services</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, color: "text-primary-500" },
            { label: "Pending", value: stats.pending, color: "text-yellow-500" },
            { label: "Completed", value: stats.completed, color: "text-green-500" },
            { label: "Total Revenue", value: `$${stats.revenue}`, color: "text-purple-500" }
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl p-4 shadow-lg ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <div className="text-6xl mb-4">📬</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No Bookings Yet</h2>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>You haven't received any bookings for your services yet</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className={`hidden lg:block rounded-xl shadow-lg overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <table className="w-full">
                <thead className={isDark ? "bg-slate-700" : "bg-gray-50"}>
                  <tr>
                    {["Customer", "Service", "Date", "Price", "Status", "Actions"].map(h => (
                      <th key={h} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-700" : "divide-gray-200"}`}>
                  {bookings.map((booking, index) => (
                    <motion.tr key={booking._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className={isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-50"}>
                      <td className="px-6 py-4">
                        <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{booking.userName}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{booking.userEmail}</p>
                      </td>
                      <td className={`px-6 py-4 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{booking.serviceName}</td>
                      <td className={`px-6 py-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className={`px-6 py-4 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${booking.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateBookingStatus(booking._id, "completed")} className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Complete"><FiCheck /></button>
                            <button onClick={() => updateBookingStatus(booking._id, "cancelled")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Cancel"><FiX /></button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid gap-4">
              {bookings.map((booking) => (
                <motion.div key={booking._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`rounded-xl shadow-lg p-4 ${isDark ? "bg-slate-800" : "bg-white"}`}>
                  <div className="mb-3">
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{booking.serviceName}</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Customer: {booking.userName}</p>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Date:</span><span>{new Date(booking.bookingDate).toLocaleDateString()}</span></div>
                    <div className="flex justify-between text-sm"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Price:</span><span className="font-semibold">${booking.price}</span></div>
                    <div className="flex justify-between text-sm items-center"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Status:</span><span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.status}</span></div>
                  </div>
                  {booking.status === "pending" && (
                    <div className="flex gap-2">
                      <button onClick={() => updateBookingStatus(booking._id, "completed")} className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold">Complete</button>
                      <button onClick={() => updateBookingStatus(booking._id, "cancelled")} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold">Cancel</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProviderBookings;
