import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeProvider";
import toast from "react-hot-toast";

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contactInfo = [
    { icon: <FiMapPin />, title: "Address", content: "123 Service Street, Mirpur - 1206, Dhaka, Bangladesh" },
    { icon: <FiPhone />, title: "Phone", content: "+88 01711-567890" },
    { icon: <FiMail />, title: "Email", content: "info@homehero.com" },
    { icon: <FiClock />, title: "Business Hours", content: "Mon - Fri: 8AM - 8PM" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - HomeHero</title>
        <meta name="description" content="Get in touch with HomeHero. We're here to help with any questions." />
      </Helmet>

      {/* Hero */}
      <section className={`py-20 ${isDark ? "bg-slate-900" : "bg-gradient-to-r from-primary-500 to-primary-600"}`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Subject</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="How can we help?" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Message *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} placeholder="Your message..." />
                </div>
                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? "Sending..." : <><FiSend /> Send Message</>}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-start gap-4 p-4 rounded-xl ${isDark ? "bg-slate-800" : "bg-gray-50"}`}>
                    <div className={`p-3 rounded-lg text-primary-500 ${isDark ? "bg-primary-900/30" : "bg-primary-100"}`}>{info.icon}</div>
                    <div>
                      <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{info.title}</h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className={`mt-8 rounded-xl overflow-hidden h-64 ${isDark ? "bg-slate-800" : "bg-gray-200"}`}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0123456789!2d90.3654321!3d23.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzU1LjYiTiA5MMKwMjEnNTUuNiJF!5e0!3m2!1sen!2sbd!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
