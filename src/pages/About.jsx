import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiHeart, FiTarget, FiShield, FiZap } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeProvider";

const About = () => {
  const { isDark } = useTheme();

  const team = [
    { name: "John Smith", role: "CEO & Founder", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sarah Johnson", role: "CTO", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Michael Brown", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/67.jpg" },
    { name: "Emily Davis", role: "Customer Success", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  const values = [
    { icon: <FiShield />, title: "Trust & Safety", description: "We prioritize the safety of our customers and providers with thorough vetting." },
    { icon: <FiHeart />, title: "Customer First", description: "Every decision we make is centered around providing the best customer experience." },
    { icon: <FiZap />, title: "Innovation", description: "We continuously improve our platform to make home services easier than ever." },
    { icon: <FiTarget />, title: "Excellence", description: "We strive for excellence in every service delivered through our platform." },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - HomeHero</title>
        <meta name="description" content="Learn about HomeHero's mission to connect homeowners with trusted service providers" />
      </Helmet>

      {/* Hero Section */}
      <section className={`py-20 ${isDark ? "bg-slate-900" : "bg-gradient-to-r from-primary-500 to-primary-600"}`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About HomeHero</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're on a mission to revolutionize how homeowners find and book trusted local service providers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Our Story</h2>
              <div className={`space-y-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <p>Founded in 2024, HomeHero started with a simple idea: make finding reliable home service providers as easy as ordering food online.</p>
                <p>We noticed that homeowners often struggled to find trustworthy professionals for their home maintenance needs. From electricians to plumbers, the process was time-consuming and often unreliable.</p>
                <p>Today, HomeHero connects thousands of homeowners with verified service providers, ensuring quality service every time. Our platform has facilitated over 10,000+ successful bookings and continues to grow.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Our Values</h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>The principles that guide everything we do</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-xl text-center ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl text-primary-500 ${isDark ? "bg-primary-900/30" : "bg-primary-100"}`}>{value.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{value.title}</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Meet Our Team</h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>The people behind HomeHero</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-xl text-center ${isDark ? "bg-slate-800" : "bg-gray-50"}`}>
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "500+", label: "Service Providers" },
              { value: "10K+", label: "Happy Customers" },
              { value: "50+", label: "Service Categories" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
