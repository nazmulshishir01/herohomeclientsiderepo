import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCamera, FiCheck, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [passwordValidation, setPasswordValidation] = useState({ length: false, uppercase: false, lowercase: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordValidation({ length: value.length >= 6, uppercase: /[A-Z]/.test(value), lowercase: /[a-z]/.test(value) });
    }
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) { toast.error("Please fill in all required fields"); return false; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) { toast.error("Password must contain uppercase and lowercase letters"); return false; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await createUser(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photoURL || null);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") { toast.error("This email is already registered"); }
      else if (error.code === "auth/invalid-email") { toast.error("Invalid email address"); }
      else { toast.error("Failed to register. Please try again."); }
    } finally { setLoading(false); }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) { toast.error("Failed to register with Google"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Helmet><title>Register - HomeHero</title></Helmet>
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-primary-50 via-white to-primary-50"}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Create Account</h2>
            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Join HomeHero to get started</p>
          </div>

          <motion.div className={`rounded-2xl shadow-xl p-8 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Enter your full name" />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Enter your email" />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Photo URL <span className="text-gray-400">(Optional)</span></label>
                <div className="relative">
                  <FiCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="url" name="photoURL" value={formData.photoURL} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="https://example.com/photo.jpg" />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className={`w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Create a password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showPassword ? <FiEyeOff /> : <FiEye />}</button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className={`flex items-center gap-2 text-sm ${passwordValidation.length ? "text-green-500" : "text-gray-400"}`}>{passwordValidation.length ? <FiCheck /> : <FiX />} At least 6 characters</div>
                    <div className={`flex items-center gap-2 text-sm ${passwordValidation.uppercase ? "text-green-500" : "text-gray-400"}`}>{passwordValidation.uppercase ? <FiCheck /> : <FiX />} One uppercase letter</div>
                    <div className={`flex items-center gap-2 text-sm ${passwordValidation.lowercase ? "text-green-500" : "text-gray-400"}`}>{passwordValidation.lowercase ? <FiCheck /> : <FiX />} One lowercase letter</div>
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border border-slate-600 text-white" : "bg-gray-50 border border-gray-200"}`} placeholder="Confirm your password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showConfirmPassword ? <FiEyeOff /> : <FiEye />}</button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && <p className="mt-1 text-sm text-red-500">Passwords do not match</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Create Account"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}></div></div>
              <div className="relative flex justify-center text-sm"><span className={`px-2 ${isDark ? "bg-slate-800 text-gray-500" : "bg-white text-gray-500"}`}>Or register with</span></div>
            </div>

            <button type="button" onClick={handleGoogleRegister} disabled={loading} className={`w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 ${isDark ? "bg-slate-700 border border-slate-600 hover:bg-slate-600" : "bg-white border border-gray-200 hover:bg-gray-50"}`}>
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>

            <p className={`mt-6 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>Already have an account? <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">Login here</Link></p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
