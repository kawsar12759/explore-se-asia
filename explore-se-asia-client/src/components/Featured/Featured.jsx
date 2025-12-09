import { Link, useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import travelCostPng from '../../assets/travel.png'
import travelDurationPng from '../../assets/duration.png'

const Featured = () => {
    const touristSpots = useLoaderData();

    return (
        <div className="bg-gray-100 text-black py-16 px-6 xs:px-10">
            <div className="container mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Featured Tourist Spots</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {touristSpots.slice(0, 6).map((spot) => (
                        <div key={spot._id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <div className="relative">
                                <img src={spot.image} alt={spot.spotName} className="w-full h-52 object-cover rounded-t-xl" />
                                <div className="absolute bottom-4 left-4 flex items-center bg-gray-900 bg-opacity-60 px-3 py-2 rounded-md">
                                    <FaLocationDot className="text-white text-lg" />
                                    <p className="text-white text-md ml-2">{spot.location}, {spot.country}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">{spot.spotName}</h2>

                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center">
                                        <img className="h-6 mr-2" src={travelCostPng} alt="Travel Cost" />
                                        <p className="font-medium text-gray-700">Approx. ${spot.averageCost}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="h-6 mr-2" src={travelDurationPng} alt="Travel Duration" />
                                        <p className="font-medium text-gray-700">{spot.travelDuration} Day/s</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 font-medium mb-2">Visitors: {spot.totalVisitors}</p>
                                <p className="text-gray-800 font-semibold mb-4">Travel Season: {spot.seasonality}</p>

                                <Link to={`/spot-details/${spot._id}`}>
                                    <button className="w-full bg-[#008080] text-white py-2 px-6 rounded-full hover:bg-[#006666] transition-colors duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
