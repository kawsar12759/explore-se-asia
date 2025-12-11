import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import travelCostPng from '../../assets/travel.png';
import travelDurationPng from '../../assets/duration.png';

const AllSpot = () => {
    const loadedSpots = useLoaderData();
    const [touristSpots, setTouristSpots] = useState(loadedSpots);
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("visitors");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const spotsPerPage = 12;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredSpots = touristSpots
        .filter((spot) =>
            (selectedCountry === "All" || spot.country === selectedCountry) &&
            (spot.spotName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === "cost") {
                return a.averageCost - b.averageCost;
            }
            else if (sortBy === "visitors") {
                return a.visitors - b.visitors;
            } else {
                return a.travelDuration - b.travelDuration;
            }
        });

    const totalPages = Math.ceil(filteredSpots.length / spotsPerPage);

    const displayedSpots = filteredSpots.slice(
        (currentPage - 1) * spotsPerPage,
        currentPage * spotsPerPage
    );

    const handleCountryFilter = (country) => {
        setSelectedCountry(country);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="bg-gray-50 text-black min-h-screen py-12">
            <div className="container mx-auto xs:px-4 sm:px-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Tourist Spots</h1>\
                <div className="flex justify-center">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full md:w-fit items-end mb-8 p-4 md:p-0">
                        <div className="w-full md:w-auto">
                            <label htmlFor="country" className="text-lg font-medium mr-4">Country</label>
                            <select
                                id="country"
                                value={selectedCountry}
                                onChange={(e) => handleCountryFilter(e.target.value)}
                                className="p-2 border rounded-md w-full md:w-48"
                            >
                                <option value="All">All</option>
                                {[...new Set(touristSpots.map((spot) => spot.country))].map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-auto">
                            <label htmlFor="sort" className="text-lg font-medium mr-4">Sort By</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={handleSort}
                                className="p-2 border w-full md:w-36 rounded-md"
                            >
                                <option value="visitors">Popularity</option>
                                <option value="cost">Cost</option>
                                <option value="duration">Duration</option>
                            </select>
                        </div>

                        <div className="w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search for spots..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="p-2 w-full md:w-56 border rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                    {displayedSpots.map((spot) => (
                        <div
                            key={spot._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={spot.image}
                                    alt={spot.spotName}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="absolute bottom-2 left-4 flex items-center bg-black bg-opacity-60 px-3 py-2 rounded-md">
                                    <FaLocationDot className="text-white text-lg" />
                                    <p className="text-white text-md ml-2">{spot.location}, {spot.country}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{spot.spotName}</h2>

                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center">
                                        <img className="h-6 mr-2" src={travelCostPng} alt="Travel Cost" />
                                        <p className="font-medium text-gray-600">Approx. {spot.averageCost}$</p>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="h-6 mr-2" src={travelDurationPng} alt="Travel Duration" />
                                        <p className="font-medium text-gray-600">{spot.travelDuration} Day/s</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 font-medium mb-2">Visitors: {spot.totalVisitors}</p>
                                <p className="text-gray-800 font-semibold mb-4">Travel Season: {spot.seasonality}</p>

                                <Link to={`/spot-details/${spot._id}`}>
                                    <button className="w-full bg-teal-600 text-white py-2 px-6 rounded-full transition-colors duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-3">
                        {currentPage > 1 && (
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition-all duration-300"
                            >
                                Prev
                            </button>
                        )}

                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber + 1)}
                                className={`py-2 px-4 rounded-full transition-all duration-300 ${pageNumber + 1 === currentPage
                                    ? "bg-teal-600 text-white"
                                    : "bg-gray-200 text-teal-600 hover:bg-teal-500 hover:text-white"
                                    }`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}

                        {currentPage < totalPages && (
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition-all duration-300"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSpot;
