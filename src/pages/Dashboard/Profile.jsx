import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCamera, FiEdit2, FiSave, FiX, FiCalendar, FiClock, FiShield } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || ""
  });

  const handleUpdate = async () => {
    if (!formData.displayName.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({ displayName: user?.displayName || "", photoURL: user?.photoURL || "" });
    setIsEditing(false);
  };

  return (
    <>
      <Helmet><title>Profile - HomeHero Dashboard</title></Helmet>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>My Profile</h1>
          
          {/* Profile Card */}
          <div className={`rounded-2xl shadow-lg overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-gray-200">
                  {(isEditing ? formData.photoURL : user?.photoURL) ? (
                    <img src={isEditing ? formData.photoURL : user?.photoURL} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/128"; }} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-bold">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-full cursor-pointer hover:bg-primary-600">
                    <FiCamera />
                  </label>
                )}
              </div>

              {/* Edit Button */}
              <div className="absolute top-4 right-6">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${isDark ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
                    <FiEdit2 /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${isDark ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
                      <FiX /> Cancel
                    </button>
                    <button onClick={handleUpdate} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50">
                      {loading ? "Saving..." : <><FiSave /> Save</>}
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Display Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Photo URL</label>
                      <div className="relative">
                        <FiCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="url" value={formData.photoURL} onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })} className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="https://example.com/photo.jpg" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user?.displayName || "User"}</h2>
                    <p className={`flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}><FiMail /> {user?.email}</p>
                  </div>
                )}

                {/* Account Details */}
                <div className={`pt-6 border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <FiShield className="text-primary-500" />
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>User ID</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{user?.uid?.slice(0, 20)}...</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <FiMail className="text-primary-500" />
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email Verified</p>
                          <p className={`font-medium ${user?.emailVerified ? "text-green-500" : "text-yellow-500"}`}>{user?.emailVerified ? "Verified" : "Not Verified"}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-primary-500" />
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Account Created</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <FiClock className="text-primary-500" />
                        <div>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Last Login</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
