import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiDollarSign, FiStar, FiGrid, FiList, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../contexts/ThemeProvider";

const Services = () => {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (priceRange.min) params.set("minPrice", priceRange.min);
    if (priceRange.max) params.set("maxPrice", priceRange.max);
    if (sortBy !== "default") params.set("sort", sortBy);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory, priceRange, sortBy]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      // Dummy data for development
      const dummyServices = [
        { _id: "1", serviceName: "House Cleaning", category: "Cleaning", price: 50, description: "Professional house cleaning service", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400", providerName: "John Doe", averageRating: 4.5, reviews: [] },
        { _id: "2", serviceName: "Plumbing Service", category: "Plumbing", price: 80, description: "Expert plumbing solutions", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", providerName: "Mike Smith", averageRating: 4.8, reviews: [] },
        { _id: "3", serviceName: "Electrical Repair", category: "Electrical", price: 100, description: "Safe electrical repair services", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400", providerName: "David Wilson", averageRating: 4.7, reviews: [] },
        { _id: "4", serviceName: "Gardening", category: "Gardening", price: 60, description: "Beautiful garden maintenance", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400", providerName: "Sarah Green", averageRating: 4.6, reviews: [] },
        { _id: "5", serviceName: "Painting Service", category: "Painting", price: 150, description: "Professional painting services", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400", providerName: "Tom Brown", averageRating: 4.4, reviews: [] },
        { _id: "6", serviceName: "AC Repair", category: "HVAC", price: 120, description: "Quick AC repair service", imageUrl: "https://images.unsplash.com/photo-1631545806609-90e678c12e05?w=400", providerName: "James Lee", averageRating: 4.9, reviews: [] },
        { _id: "7", serviceName: "Carpentry Work", category: "Carpentry", price: 90, description: "Custom carpentry work", imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400", providerName: "Robert Wood", averageRating: 4.3, reviews: [] },
        { _id: "8", serviceName: "Deep Cleaning", category: "Cleaning", price: 120, description: "Thorough deep cleaning", imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400", providerName: "Anna Clean", averageRating: 4.7, reviews: [] },
        { _id: "9", serviceName: "Roof Repair", category: "Roofing", price: 200, description: "Professional roof repair", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400", providerName: "Max Roofer", averageRating: 4.5, reviews: [] },
        { _id: "10", serviceName: "Window Cleaning", category: "Cleaning", price: 40, description: "Crystal clear windows", imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400", providerName: "Clear View", averageRating: 4.6, reviews: [] },
      ];
      setServices(dummyServices);
      setFilteredServices(dummyServices);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      setCategories(["Cleaning", "Plumbing", "Electrical", "Gardening", "Painting", "HVAC", "Carpentry", "Roofing"]);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((service) => service.category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter((service) => service.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((service) => service.price <= parseFloat(priceRange.max));
    }

    // Sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setSortBy("default");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Services - HomeHero</title>
        <meta name="description" content="Browse all home services on HomeHero" />
      </Helmet>

      {/* Hero Section */}
      <section className={`py-12 ${isDark ? "bg-slate-900" : "bg-gradient-to-r from-primary-500 to-primary-600"}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Service</h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Browse through our wide range of professional home services</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 ${isDark ? "bg-slate-800 text-white" : "bg-white"}`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Services */}
      <section className={`py-12 ${isDark ? "bg-dark-bg" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl shadow-lg p-6 mb-8 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`}
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* Price Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFilters ? "bg-primary-500 text-white border-primary-500" : isDark ? "border-slate-600 hover:bg-slate-700" : "border-gray-200 hover:bg-gray-100"}`}
                >
                  <FiFilter />
                  Price Filter
                </button>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory !== "all" || priceRange.min || priceRange.max || sortBy !== "default") && (
                  <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <FiX /> Clear
                  </button>
                )}
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary-500 text-white" : isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
                  <FiGrid />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary-500 text-white" : isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
                  <FiList />
                </button>
              </div>
            </div>

            {/* Price Range Inputs */}
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Min Price</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="0"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Max Price</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="1000"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-200"}`}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Showing {filteredServices.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredServices.length)} of {filteredServices.length} services
            </p>
          </div>

          {/* Services Grid */}
          {currentServices.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {currentServices.map((service, index) => (
                <motion.div key={service._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No Services Found</h3>
              <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Clear Filters</button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-lg border disabled:opacity-50 ${isDark ? "border-slate-700 hover:bg-slate-700" : "border-gray-200 hover:bg-gray-100"}`}>
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                  return (
                    <button key={pageNumber} onClick={() => paginate(pageNumber)} className={`w-10 h-10 rounded-lg font-medium ${currentPage === pageNumber ? "bg-primary-500 text-white" : isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
                      {pageNumber}
                    </button>
                  );
                } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-lg border disabled:opacity-50 ${isDark ? "border-slate-700 hover:bg-slate-700" : "border-gray-200 hover:bg-gray-100"}`}>
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
