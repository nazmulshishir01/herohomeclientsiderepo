import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, googleSignIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send reset email");
    }
  };

  const fillDemoUser = () => {
    setEmail("demo@homehero.com");
    setPassword("Demo@123");
  };

  const fillDemoAdmin = () => {
    setEmail("admin@homehero.com");
    setPassword("Admin@123");
  };

  return (
    <>
      <Helmet>
        <title>Login - HomeHero</title>
      </Helmet>
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-primary-50 via-white to-primary-50"}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Welcome Back</h2>
            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Login to your HomeHero account</p>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className={`rounded-2xl shadow-xl p-8 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            {/* Demo Credentials */}
            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
              <p className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Demo Credentials:</p>
              <div className="flex gap-2">
                <button onClick={fillDemoUser} className="flex-1 px-3 py-2 text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600">Demo User</button>
                <button onClick={fillDemoAdmin} className="flex-1 px-3 py-2 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600">Demo Admin</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={handleForgotPassword} className="text-sm text-primary-500 hover:text-primary-600">Forgot Password?</button>
              </div>

              <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Login"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}></div></div>
              <div className="relative flex justify-center text-sm"><span className={`px-2 ${isDark ? "bg-slate-800 text-gray-500" : "bg-white text-gray-500"}`}>Or continue with</span></div>
            </div>

            <button type="button" onClick={handleGoogleLogin} disabled={loading} className={`w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 ${isDark ? "bg-slate-700 border border-slate-600 hover:bg-slate-600" : "bg-white border border-gray-200 hover:bg-gray-50"}`}>
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>

            <p className={`mt-6 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Don't have an account? <Link to="/register" className="text-primary-500 hover:text-primary-600 font-semibold">Register here</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
