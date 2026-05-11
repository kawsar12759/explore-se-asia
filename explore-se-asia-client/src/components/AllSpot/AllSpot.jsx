import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiClock } from "react-icons/fi";

const AllSpot = () => {
    const loadedSpots = useLoaderData();
    const [touristSpots] = useState(loadedSpots);
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [costRange, setCostRange] = useState(5000);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("popularity");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const spotsPerPage = 12;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get unique spot types
    const spotTypes = ["All", ...new Set(touristSpots.map((spot) => spot.spotType || "General"))];
    const countries = ["All", ...new Set(touristSpots.map((spot) => spot.country))];

    const filteredSpots = touristSpots
        .filter((spot) =>
            (selectedCountry === "All" || spot.country === selectedCountry) &&
            (selectedType === "All" || spot.spotType === selectedType) &&
            (spot.averageCost <= costRange) &&
            (spot.spotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                spot.location.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === "cost-low") {
                return a.averageCost - b.averageCost;
            } else if (sortBy === "cost-high") {
                return b.averageCost - a.averageCost;
            } else if (sortBy === "visitors") {
                return b.totalVisitors - a.totalVisitors;
            } else if (sortBy === "duration-short") {
                return a.travelDuration - b.travelDuration;
            } else {
                return b.totalVisitors - a.totalVisitors; // popularity
            }
        });

    const totalPages = Math.ceil(filteredSpots.length / spotsPerPage);
    const displayedSpots = filteredSpots.slice(
        (currentPage - 1) * spotsPerPage,
        currentPage * spotsPerPage
    );

    const handleCountryFilter = (country) => {
        setSelectedCountry(country);
        setCurrentPage(1);
    };

    const handleTypeFilter = (type) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const handleResetFilters = () => {
        setSelectedCountry("All");
        setSelectedType("All");
        setCostRange(5000);
        setSearchTerm("");
        setSortBy("popularity");
        setCurrentPage(1);
    };

    return (
        <div className="bg-white text-black min-h-screen py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-adventure-gradient mb-3">
                        Discover All Southeast Asia Destinations
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Filter and explore {filteredSpots.length} amazing travel spots tailored to your preferences
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-gradient-to-r from-adventure-50 to-explore-50 rounded-2xl p-6 sm:p-8 mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <FiFilter className="text-adventure-600 text-xl" />
                        <h3 className="text-xl font-bold text-adventure-600">Filters</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Country Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Country
                            </label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => handleCountryFilter(e.target.value)}
                                className="w-full p-3 border-2 border-adventure-200 rounded-lg focus:outline-none focus:border-adventure-500 bg-white"
                            >
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Spot Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => handleTypeFilter(e.target.value)}
                                className="w-full p-3 border-2 border-adventure-200 rounded-lg focus:outline-none focus:border-adventure-500 bg-white"
                            >
                                {spotTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={handleSort}
                                className="w-full p-3 border-2 border-adventure-200 rounded-lg focus:outline-none focus:border-adventure-500 bg-white"
                            >
                                <option value="popularity">Most Popular</option>
                                <option value="cost-low">Price: Low to High</option>
                                <option value="cost-high">Price: High to Low</option>
                                <option value="visitors">Most Visited</option>
                                <option value="duration-short">Shortest Trip</option>
                            </select>
                        </div>

                        {/* Cost Range */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Max Cost: ${costRange}
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="100"
                                value={costRange}
                                onChange={(e) => {
                                    setCostRange(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-adventure-600"
                            />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search by spot name or location..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-3 border-2 border-adventure-200 rounded-lg focus:outline-none focus:border-adventure-500"
                            />
                        </div>
                        <button
                            onClick={handleResetFilters}
                            className="btn-adventure-outline px-6 whitespace-nowrap"
                        >
                            Reset Filters
                        </button>
                    </div>

                    <p className="text-sm text-gray-600">
                        Found <span className="font-bold text-adventure-600">{filteredSpots.length}</span> destinations
                    </p>
                </div>

                {/* Results */}
                {displayedSpots.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                            {displayedSpots.map((spot) => (
                                <div key={spot._id} className="card-adventure group overflow-hidden">
                                    <div className="relative overflow-hidden h-56">
                                        <img
                                            src={spot.image}
                                            alt={spot.spotName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3">
                                            {spot.spotType && (
                                                <span className="badge-adventure">
                                                    {spot.spotType}
                                                </span>
                                            )}
                                        </div>
                                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                                            <FiMapPin className="text-sm" />
                                            <span className="text-sm font-medium">
                                                {spot.location}, {spot.country}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                            {spot.spotName}
                                        </h3>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FiDollarSign className="text-adventure-600" />
                                                <span className="text-sm">Approx. <span className="font-bold">${spot.averageCost}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FiClock className="text-adventure-600" />
                                                <span className="text-sm"><span className="font-bold">{spot.travelDuration}</span> days</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="text-sm">Season: <span className="font-bold">{spot.seasonality}</span></span>
                                            </div>
                                        </div>

                                        <Link to={`/spot-details/${spot._id}`}>
                                            <button className="btn-adventure w-full font-bold">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 flex-wrap">
                            {currentPage > 1 && (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="btn btn-sm bg-gradient-adventure text-white border-none rounded-lg"
                                >
                                    ← Previous
                                </button>
                            )}

                            <div className="flex gap-1 flex-wrap justify-center">
                                {[...Array(totalPages).keys()].map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber + 1)}
                                        className={`btn btn-sm rounded-lg transition-all duration-200 ${
                                            pageNumber + 1 === currentPage
                                                ? "bg-gradient-adventure text-white border-none"
                                                : "btn-outline border-adventure-500 text-adventure-600 hover:bg-adventure-50"
                                        }`}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}
                            </div>

                            {currentPage < totalPages && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="btn btn-sm bg-gradient-adventure text-white border-none rounded-lg"
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-2xl font-bold text-gray-800 mb-4">
                            No destinations found
                        </p>
                        <p className="text-gray-600 mb-8">
                            Try adjusting your filters to find more spots
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="btn-adventure px-8"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllSpot;
