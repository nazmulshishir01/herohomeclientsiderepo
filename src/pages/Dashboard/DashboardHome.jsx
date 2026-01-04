import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiPackage, FiCalendar, FiDollarSign, FiStar, FiTrendingUp, FiUsers } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const DashboardHome = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/stats?email=${user?.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set dummy data for demonstration
      setStats({
        totalServices: 5,
        totalBookings: 12,
        pendingBookings: 3,
        completedBookings: 9,
        totalRevenue: 1250,
        averageRating: 4.5,
        monthlyRevenue: [
          { month: "Aug", revenue: 200, bookings: 2 },
          { month: "Sep", revenue: 350, bookings: 4 },
          { month: "Oct", revenue: 280, bookings: 3 },
          { month: "Nov", revenue: 420, bookings: 5 },
          { month: "Dec", revenue: 500, bookings: 6 },
          { month: "Jan", revenue: 380, bookings: 4 }
        ],
        categoryDistribution: [
          { name: "Cleaning", value: 3 },
          { name: "Plumbing", value: 1 },
          { name: "Electrical", value: 1 }
        ],
        recentBookings: []
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  const statCards = [
    { title: "Total Services", value: stats?.totalServices || 0, icon: <FiPackage />, color: "from-blue-500 to-blue-600", change: "+12%" },
    { title: "Total Bookings", value: stats?.totalBookings || 0, icon: <FiCalendar />, color: "from-green-500 to-green-600", change: "+8%" },
    { title: "Total Revenue", value: `$${stats?.totalRevenue || 0}`, icon: <FiDollarSign />, color: "from-purple-500 to-purple-600", change: "+15%" },
    { title: "Average Rating", value: stats?.averageRating?.toFixed(1) || "0.0", icon: <FiStar />, color: "from-yellow-500 to-orange-500", change: "+5%" }
  ];

  if (loading) return <LoadingSpinner fullScreen={false} />;

  return (
    <>
      <Helmet><title>Dashboard - HomeHero</title></Helmet>
      
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Welcome back, {user?.displayName || "User"}! 👋
          </h1>
          <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Here's what's happening with your services today.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.title}</p>
                  <p className={`text-2xl md:text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  <p className="text-sm text-green-500 mt-1 flex items-center gap-1"><FiTrendingUp /> {stat.change}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white text-2xl`}>{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Revenue Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.monthlyRevenue || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? "#1e293b" : "#fff", border: "none", borderRadius: "8px" }} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Services by Category</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats?.categoryDistribution || []} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {(stats?.categoryDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bookings Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Bookings Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.monthlyRevenue || []}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip contentStyle={{ backgroundColor: isDark ? "#1e293b" : "#fff", border: "none", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Booking Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Pending</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">{stats?.pendingBookings || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Completed</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{stats?.completedBookings || 0}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className={`rounded-xl p-6 ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Performance</h3>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-2xl font-bold mb-2">
                {stats?.averageRating?.toFixed(1) || "0"}
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>Average Rating</p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (<FiStar key={i} className={`${i < Math.round(stats?.averageRating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className={`rounded-xl p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg`}>
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-white/80 text-sm mb-4">Check our documentation or contact support for assistance.</p>
            <button className="px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Support</button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
