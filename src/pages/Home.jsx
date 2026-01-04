import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import {
  FiArrowRight,
  FiCheck,
  FiUsers,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiStar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiAward,
  FiThumbsUp,
  FiHeart,
  FiZap,
} from "react-icons/fi";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { useTheme } from "../contexts/ThemeProvider";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Home = () => {
  const { isDark } = useTheme();
  const [services, setServices] = useState([]);
  const [topRatedServices, setTopRatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 500,
    totalBookings: 10000,
    totalUsers: 5000,
    totalCategories: 50,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const [servicesRes, topRatedRes, statsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services?limit=6`),
        axios.get(`${import.meta.env.VITE_API_URL}/top-rated-services`),
        axios.get(`${import.meta.env.VITE_API_URL}/platform-stats`).catch(() => ({ data: stats })),
      ]);

      setServices(servicesRes.data);
      setTopRatedServices(topRatedRes.data);
      if (statsRes.data) setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
     
      setServices(getDummyServices());
      setTopRatedServices(getDummyServices());
    } finally {
      setLoading(false);
    }
  };

  const getDummyServices = () => [
    { _id: "1", serviceName: "House Cleaning", category: "Cleaning", price: 50, description: "Professional house cleaning service with trained staff", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400", providerName: "John Doe", averageRating: 4.5, reviews: [] },
    { _id: "2", serviceName: "Plumbing Service", category: "Plumbing", price: 80, description: "Expert plumbing solutions for all your needs", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", providerName: "Mike Smith", averageRating: 4.8, reviews: [] },
    { _id: "3", serviceName: "Electrical Repair", category: "Electrical", price: 100, description: "Safe and reliable electrical repair services", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400", providerName: "David Wilson", averageRating: 4.7, reviews: [] },
    { _id: "4", serviceName: "Gardening", category: "Gardening", price: 60, description: "Beautiful garden maintenance and landscaping", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400", providerName: "Sarah Green", averageRating: 4.6, reviews: [] },
    { _id: "5", serviceName: "Painting Service", category: "Painting", price: 150, description: "Professional painting for homes and offices", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400", providerName: "Tom Brown", averageRating: 4.4, reviews: [] },
    { _id: "6", serviceName: "AC Repair", category: "HVAC", price: 120, description: "Quick AC repair and maintenance service", imageUrl: "https://images.unsplash.com/photo-1631545806609-90e678c12e05?w=400", providerName: "James Lee", averageRating: 4.9, reviews: [] },
  ];

  const heroSlides = [
    { id: 1, title: "Professional Home Services", subtitle: "Trusted Local Experts", description: "Connect with verified professionals for all your home maintenance needs", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1920", gradient: "from-blue-600 to-purple-600" },
    { id: 2, title: "Quick & Reliable", subtitle: "Same Day Service", description: "Get instant quotes and book services with just a few clicks", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920", gradient: "from-green-600 to-teal-600" },
    { id: 3, title: "Quality Guaranteed", subtitle: "100% Satisfaction", description: "All services backed by our quality guarantee and insurance", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920", gradient: "from-orange-600 to-red-600" },
  ];

  const categories = [
    { name: "Cleaning", icon: "🧹", count: 120 },
    { name: "Plumbing", icon: "🔧", count: 85 },
    { name: "Electrical", icon: "⚡", count: 95 },
    { name: "Gardening", icon: "🌱", count: 60 },
    { name: "Painting", icon: "🎨", count: 70 },
    { name: "HVAC", icon: "❄️", count: 55 },
    { name: "Carpentry", icon: "🪚", count: 45 },
    { name: "Pest Control", icon: "🐛", count: 40 },
  ];

  const features = [
    { icon: <FiShield className="text-3xl" />, title: "Verified Professionals", description: "All service providers are thoroughly vetted and background checked" },
    { icon: <FiClock className="text-3xl" />, title: "Quick Booking", description: "Book services instantly with real-time availability" },
    { icon: <FiUsers className="text-3xl" />, title: "Customer Reviews", description: "Read genuine reviews from verified customers" },
    { icon: <FiTrendingUp className="text-3xl" />, title: "Competitive Pricing", description: "Compare prices and choose the best value" },
  ];

  const testimonials = [
    { id: 1, name: "Sarah Johnson", role: "Homeowner", image: "https://randomuser.me/api/portraits/women/1.jpg", rating: 5, comment: "HomeHero made finding a reliable plumber so easy! The service was professional and the pricing was transparent." },
    { id: 2, name: "Michael Chen", role: "Business Owner", image: "https://randomuser.me/api/portraits/men/2.jpg", rating: 5, comment: "I use HomeHero for all my office maintenance needs. The quality of service providers is consistently excellent." },
    { id: 3, name: "Emily Davis", role: "Property Manager", image: "https://randomuser.me/api/portraits/women/3.jpg", rating: 5, comment: "Managing multiple properties is easier with HomeHero. Quick response times and reliable professionals every time." },
  ];

  const howItWorks = [
    { step: 1, title: "Search Service", description: "Browse through our wide range of home services", icon: "🔍" },
    { step: 2, title: "Choose Provider", description: "Select from verified professionals based on ratings", icon: "👤" },
    { step: 3, title: "Book Online", description: "Schedule at your convenience with easy booking", icon: "📅" },
    { step: 4, title: "Get Service", description: "Sit back and enjoy quality service at your doorstep", icon: "✅" },
  ];

  const faqs = [
    { q: "How do I book a service?", a: "Simply browse our services, select your preferred provider, choose a date and time, and confirm your booking. It's that easy!" },
    { q: "Are the service providers verified?", a: "Yes, all our service providers undergo thorough background checks and verification before joining our platform." },
    { q: "What if I'm not satisfied with the service?", a: "We offer a 100% satisfaction guarantee. If you're not happy, we'll work to make it right or provide a refund." },
    { q: "Can I cancel my booking?", a: "Yes, you can cancel your booking from your dashboard. Cancellation policies may vary based on timing." },
  ];

  return (
    <>
      <Helmet>
        <title>HomeHero - Your Local Service Expert</title>
        <meta name="description" content="Connect with trusted local service providers for all your home needs" />
      </Helmet>

      {/* Section 1: Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl text-white">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">{slide.subtitle}</span>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-lg md:text-xl mb-8 text-white/90">{slide.description}</p>
                      <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
                        Explore Services <FiArrowRight />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Section 2: Stats Counter */}
      <section className="py-12 bg-gradient-to-r from-primary-500 to-primary-600 -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${stats.totalServices}+`, label: "Services" },
              { value: `${(stats.totalBookings / 1000).toFixed(0)}K+`, label: "Happy Customers" },
              { value: `${stats.totalUsers}+`, label: "Providers" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center text-white">
                <div className="text-3xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Browse by Category</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Find the perfect service for your needs</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat, index) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Link to={`/services?category=${cat.name}`} className={`block p-4 rounded-xl text-center transition-all hover:-translate-y-2 hover:shadow-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-white hover:shadow-xl"}`}>
                  <span className="text-4xl mb-2 block">{cat.icon}</span>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{cat.name}</h3>
                  <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>{cat.count}+ services</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Services */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Featured Services</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Discover our most popular services</p>
          </motion.div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`rounded-2xl h-96 animate-pulse ${isDark ? "bg-slate-800" : "bg-gray-200"}`}></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => (
                <motion.div key={service._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-primary-500/30 transition-all transform hover:scale-105">
              View All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>How It Works</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Simple steps to get the service you need</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center relative">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl ${isDark ? "bg-slate-800" : "bg-primary-50"}`}>{item.icon}</div>
                <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? "bg-primary-600 text-white" : "bg-primary-500 text-white"}`}>{item.step}</span>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Why Choose Us */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Why Choose HomeHero</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>We're committed to providing the best service experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform ${isDark ? "bg-primary-900/30" : "bg-primary-100"}`}>{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Top Rated Services */}
      {topRatedServices.length > 0 && (
        <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-white"}`}>
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>⭐ Top Rated Services</h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Highest rated services by our customers</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topRatedServices.slice(0, 6).map((service, index) => (
                <motion.div key={service._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 8: Testimonials */}
      <section className={`py-16 ${isDark ? "bg-dark-bg" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>What Our Customers Say</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Don't just take our word for it</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-2xl shadow-xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (<FiStar key={i} className="text-yellow-400 fill-current" />))}
                </div>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Frequently Asked Questions</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>Got questions? We've got answers</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`p-6 rounded-xl ${isDark ? "bg-slate-800" : "bg-gray-50"}`}>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{faq.q}</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers and find the perfect service provider today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
                Browse Services <FiArrowRight />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                Become a Provider
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
