const Admin = () => {
    const [activeTab, setActiveTab] = useState("tours");
    const [tours, setTours] = useState(initialTours);
    const [currentTour, setCurrentTour] = useState(null);

    // Placeholder for handleTourSubmit
    const handleTourSubmit = (e) => {
        e.preventDefault();
        // Add or update logic here
        setCurrentTour(null);
    };

    return (
        <>
            {/* Admin Dashboard */}
            <section className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h2>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        {["tours", "media", "pricing", "analytics"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tours Management */}
                {activeTab === "tours" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={() =>
                                    setCurrentTour({
                                        id: null,
                                        title: "",
                                        category: "",
                                        destination: "",
                                        duration: "",
                                        price: "",
                                        featured: false,
                                        images: [],
                                        itinerary: [],
                                        availability: "",
                                        bookings: 0,
                                    })
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Add New Tour
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tours.map((tour) => (
                                        <tr key={tour.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.destination}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.duration}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.bookings}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Media Management */}
                {activeTab === "media" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-6">Media Management</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {tours.flatMap((tour) =>
                                tour.images.map((image, index) => (
                                    <div key={`${tour.id}-${index}`} className="relative group">
                                        <img
                                            src={image}
                                            alt={`${tour.title} ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <p className="text-center mt-2 text-sm truncate">{tour.title}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Pricing Configuration */}
                {activeTab === "pricing" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-6">Pricing Configuration</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seasonal Rates</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Discount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tours.map((tour) => (
                                        <tr key={tour.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{tour.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">-</td>
                                            <td className="px-6 py-4 whitespace-nowrap">-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Analytics Dashboard */}
                {activeTab === "analytics" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-6">Analytics Dashboard</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Total Bookings</h4>
                                <p className="text-3xl font-bold text-blue-600">
                                    {tours.reduce((sum, tour) => sum + tour.bookings, 0)}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Revenue Generated</h4>
                                <p className="text-3xl font-bold text-green-600">
                                    $
                                    {tours
                                        .reduce(
                                            (sum, tour) =>
                                                sum +
                                                (parseInt(tour.price.replace("$", "")) * tour.bookings),
                                            0
                                        )
                                        .toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-4">Top Performing Tour</h4>
                                <div className="space-y-3">
                                    {tours
                                        .sort((a, b) => b.bookings - a.bookings)
                                        .slice(0, 3)
                                        .map((tour) => (
                                            <div key={tour.id} className="flex justify-between items-center">
                                                <span>{tour.title}</span>
                                                <span className="font-bold text-blue-600">{tour.bookings} bookings</span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-4">Traffic Sources</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Website Direct</span>
                                        <span className="text-sm">45%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Google Ads</span>
                                        <span className="text-sm">30%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Social Media</span>
                                        <span className="text-sm">15%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Email Campaigns</span>
                                        <span className="text-sm">10%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Tour Form Modal */}
            {currentTour && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">
                                    {currentTour.id ? "Edit Tour" : "Add New Tour"}
                                </h3>
                                <button
                                    onClick={() => setCurrentTour(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                    title="Close"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleTourSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* ...form fields for tour editing/creation would go here... */}
                                </div>
                                {/* ...additional modal content... */}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


import React, { useState } from "react";


const initialTours = [
    {
        id: 1,
        title: "Safari Adventure",
        category: "Adventure",
        destination: "Kenya",
        duration: "7 days",
        price: "$1500",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        ],
        itinerary: [
            { day: 1, description: "Arrival and orientation" },
            { day: 2, description: "Safari drive" },
        ],
        availability: "2025-08-01 - 2025-08-31",
        bookings: 12,
    },
    {
        id: 2,
        title: "Cultural Wonders",
        category: "Cultural",
        destination: "Japan",
        duration: "10 days",
        price: "$2200",
        featured: false,
        images: [
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        itinerary: [
            { day: 1, description: "Tokyo city tour" },
            { day: 2, description: "Kyoto temples" },
        ],
        availability: "2025-09-10 - 2025-09-20",
        bookings: 8,
    },
];

// ...the rest of the Admin component and export default Admin...

export default Admin;
