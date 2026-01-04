import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiTrash2, FiStar } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyBookings = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    if (user?.email) fetchMyBookings();
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`, {
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

  const handleCancelBooking = async (bookingId, serviceName) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: `Are you sure you want to cancel "${serviceName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it!"
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("access-token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b._id !== bookingId));
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  const handleAddReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
    setReviewData({ rating: 5, comment: "" });
  };

  const submitReview = async () => {
    if (!reviewData.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }
    try {
      const token = localStorage.getItem("access-token");
      await axios.post(`${import.meta.env.VITE_API_URL}/services/${selectedBooking.serviceId}/review`, {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userName: user.displayName || "Anonymous",
        userEmail: user.email
      }, { headers: { Authorization: `Bearer ${token}` } });

      toast.success("Review added successfully!");
      setShowReviewModal(false);
      setBookings(bookings.map(b => b._id === selectedBooking._id ? { ...b, hasReviewed: true } : b));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  if (loading) return <LoadingSpinner fullScreen={false} />;

  return (
    <>
      <Helmet><title>My Bookings - HomeHero</title></Helmet>
      <div>
        <div className="mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>My Bookings</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Manage your service bookings</p>
        </div>

        {bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <div className="text-6xl mb-4">📅</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No Bookings Yet</h2>
            <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>You haven't booked any services yet</p>
            <a href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold">Browse Services</a>
          </motion.div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Bookings", value: bookings.length, icon: <FiCalendar className="text-2xl text-primary-500" /> },
                { label: "Pending", value: bookings.filter(b => b.status === "pending").length, icon: <FiCalendar className="text-2xl text-yellow-500" /> },
                { label: "Total Spent", value: `$${bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + (b.price || 0), 0)}`, icon: <FiDollarSign className="text-2xl text-green-500" /> }
              ].map((stat, i) => (
                <div key={i} className={`rounded-xl p-6 shadow-lg ${isDark ? "bg-slate-800" : "bg-white"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                      <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-100"}`}>{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className={`hidden lg:block rounded-xl shadow-lg overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <table className="w-full">
                <thead className={isDark ? "bg-slate-700" : "bg-gray-50"}>
                  <tr>
                    {["Service", "Date", "Price", "Status", "Actions"].map(h => (
                      <th key={h} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-700" : "divide-gray-200"}`}>
                  {bookings.map((booking, index) => (
                    <motion.tr key={booking._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className={isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-50"}>
                      <td className="px-6 py-4">
                        <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{booking.serviceName}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>by {booking.providerName}</p>
                      </td>
                      <td className={`px-6 py-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className={`px-6 py-4 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${booking.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!booking.hasReviewed && booking.status !== "cancelled" && (
                            <button onClick={() => handleAddReview(booking)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="Add Review"><FiStar /></button>
                          )}
                          {booking.status === "pending" && (
                            <button onClick={() => handleCancelBooking(booking._id, booking.serviceName)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Cancel"><FiTrash2 /></button>
                          )}
                        </div>
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
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>by {booking.providerName}</p>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Date:</span><span className={isDark ? "text-white" : "text-gray-900"}>{new Date(booking.bookingDate).toLocaleDateString()}</span></div>
                    <div className="flex justify-between text-sm"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Price:</span><span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${booking.price}</span></div>
                    <div className="flex justify-between text-sm items-center"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Status:</span><span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.status}</span></div>
                  </div>
                  <div className="flex gap-2">
                    {!booking.hasReviewed && booking.status !== "cancelled" && (
                      <button onClick={() => handleAddReview(booking)} className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold">Add Review</button>
                    )}
                    {booking.status === "pending" && (
                      <button onClick={() => handleCancelBooking(booking._id, booking.serviceName)} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold">Cancel</button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-xl p-6 max-w-md w-full ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Add Review</h3>
            <div className={`p-3 rounded-lg mb-4 ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
              <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{selectedBooking.serviceName}</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Provider: {selectedBooking.providerName}</p>
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setReviewData({ ...reviewData, rating: star })} className="text-2xl">{star <= reviewData.rating ? "⭐" : "☆"}</button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Your Review</label>
              <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} rows={4} className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="Share your experience..." />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReviewModal(false)} className={`flex-1 px-4 py-2 rounded-lg ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>Cancel</button>
              <button onClick={submitReview} className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold">Submit Review</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MyBookings;
