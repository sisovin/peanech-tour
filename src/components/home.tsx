import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import FeaturedTours from "./FeaturedTours";
import TourGrid from "./TourGrid";
import SearchFilter from "./SearchFilter";

const Home = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Mock data for categories
  const categories = [
    { id: 1, name: "Adventure", icon: "🏔️", count: 24 },
    { id: 2, name: "Beach", icon: "🏖️", count: 18 },
    { id: 3, name: "Cultural", icon: "🏛️", count: 15 },
    { id: 4, name: "Urban", icon: "🏙️", count: 12 },
    { id: 5, name: "Wildlife", icon: "🦁", count: 9 },
    { id: 6, name: "Culinary", icon: "🍽️", count: 7 },
  ];

  // Mock data for popular destinations
  const popularDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      tourCount: 15,
    },
    {
      id: 2,
      name: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      tourCount: 12,
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      tourCount: 10,
    },
    {
      id: 4,
      name: "Machu Picchu, Peru",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
      tourCount: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Discover the World's Wonders
          </motion.h1>

          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our handcrafted tour packages designed to create
            unforgettable travel experiences
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Explore Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Search Filter */}
      <section className="bg-white py-8 shadow-md relative z-20 -mt-12 rounded-lg mx-4 lg:mx-auto max-w-6xl">
        <SearchFilter />
      </section>

      {/* Featured Tours */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Tours</h2>
          <a href="#" className="text-primary hover:underline font-medium">
            View All
          </a>
        </div>
        <FeaturedTours />
      </section>

      {/* Tour Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl font-bold mb-2 text-center"
              variants={itemVariants}
            >
              Explore by Category
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-10 text-center max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Find your perfect adventure based on your interests and travel
              style
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} tours
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-center"
            variants={itemVariants}
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-10 text-center max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover our most sought-after locations loved by travelers
            worldwide
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                className="group relative rounded-lg overflow-hidden h-80 cursor-pointer"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {destination.tourCount} tours available
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tour Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Tour Packages</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                Filter
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration: Shortest</option>
                <option>Duration: Longest</option>
              </select>
            </div>
          </div>
          <TourGrid />
          <div className="mt-10 text-center">
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium transition-colors">
              Load More Tours
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Travel Inspiration</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and receive exclusive offers, travel
              tips, and early access to our best deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tour Explorer</h3>
              <p className="text-gray-400 mb-4">
                Discover the world with our expertly crafted tour packages
                designed to create unforgettable memories.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-primary">
                  FB
                </a>
                <a href="#" className="text-white hover:text-primary">
                  IG
                </a>
                <a href="#" className="text-white hover:text-primary">
                  TW
                </a>
                <a href="#" className="text-white hover:text-primary">
                  YT
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tour Packages
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Tour Types</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Adventure Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Beach Getaways
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cultural Experiences
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Urban Explorations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Wildlife Safaris
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Travel Street, City</li>
                <li>+1 (555) 123-4567</li>
                <li>info@tourexplorer.com</li>
                <li>Mon-Fri: 9AM - 6PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Tour Explorer. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
