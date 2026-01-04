import { useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiPlus,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiPackage,
  FiInbox,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const sidebarLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome />, end: true },
    { path: "/dashboard/profile", label: "Profile", icon: <FiUser /> },
    { path: "/dashboard/my-services", label: "My Services", icon: <FiPackage /> },
    { path: "/dashboard/add-service", label: "Add Service", icon: <FiPlus /> },
    { path: "/dashboard/my-bookings", label: "My Bookings", icon: <FiCalendar /> },
    { path: "/dashboard/provider-bookings", label: "Received Bookings", icon: <FiInbox /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
        : `${isDark ? "text-gray-400 hover:text-white hover:bg-slate-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`
    }`;

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-dark-bg" : "bg-gray-100"}`}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-full ${
          sidebarOpen ? "w-64" : "w-20"
        } ${isDark ? "bg-slate-800" : "bg-white"} shadow-xl transition-all duration-300 z-40`}
      >
        {/* Logo */}
        <div className={`p-4 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <HiOutlineSparkles className="text-white text-xl" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  HomeHero
                </h1>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Dashboard
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Toggle Sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute -right-3 top-20 p-1.5 rounded-full shadow-lg ${
            isDark ? "bg-slate-700 text-white" : "bg-white text-gray-700"
          }`}
        >
          <FiMenu className="text-sm" />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={navLinkClass}
            >
              <span className="text-xl">{link.icon}</span>
              {sidebarOpen && <span className="font-medium">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
              isDark
                ? "text-red-400 hover:bg-red-900/20"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <FiLogOut className="text-xl" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`fixed left-0 top-0 h-full w-64 ${
                isDark ? "bg-slate-800" : "bg-white"
              } shadow-xl z-50 lg:hidden`}
            >
              {/* Mobile Sidebar Content */}
              <div className={`p-4 border-b ${isDark ? "border-slate-700" : "border-gray-200"} flex justify-between items-center`}>
                <Link to="/" className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                    <HiOutlineSparkles className="text-white text-xl" />
                  </div>
                  <span className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    HomeHero
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                    isDark ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <FiLogOut className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} transition-all duration-300`}>
        {/* Top Navbar */}
        <header
          className={`sticky top-0 z-30 ${
            isDark ? "bg-slate-800/95" : "bg-white/95"
          } backdrop-blur-sm shadow-sm`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${
                isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"
              }`}
            >
              <FiMenu className="text-xl" />
            </button>

            {/* Page Title - Hidden on mobile */}
            <div className="hidden lg:block">
              <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Dashboard
              </h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-slate-700 text-yellow-400" : "hover:bg-gray-100"
                }`}
              >
                {isDark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"
                  }`}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                    </div>
                  )}
                  <span className={`hidden sm:block font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {user?.displayName || "User"}
                  </span>
                  <FiChevronDown className={isDark ? "text-gray-400" : "text-gray-600"} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl py-2 ${
                        isDark ? "bg-slate-700" : "bg-white"
                      }`}
                    >
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileDropdown(false)}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isDark ? "hover:bg-slate-600 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <FiUser />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/"
                        onClick={() => setProfileDropdown(false)}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isDark ? "hover:bg-slate-600 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <FiHome />
                        <span>Home</span>
                      </Link>
                      <hr className={`my-2 ${isDark ? "border-slate-600" : "border-gray-200"}`} />
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 px-4 py-2 w-full ${
                          isDark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"
                        }`}
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
