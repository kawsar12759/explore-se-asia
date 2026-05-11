import { Link, useLoaderData } from "react-router-dom";
import { FiMapPin, FiUsers, FiDollarSign, FiClock } from "react-icons/fi";

const Featured = () => {
    const touristSpots = useLoaderData();

    return (
        <div className="bg-white text-black py-16 px-6 xs:px-10">
            <div className="container mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-adventure-gradient">Featured Tourist Spots</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {touristSpots.slice(0, 6).map((spot) => (
                        <div key={spot._id} className="card-adventure overflow-hidden">
                            <div className="relative h-52 overflow-hidden">
                                <img src={spot.image} alt={spot.spotName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                                    <FiMapPin className="text-sm" />
                                    <p className="text-sm font-medium">{spot.location}, {spot.country}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-800 line-clamp-2">{spot.spotName}</h2>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FiDollarSign className="text-adventure-600" />
                                        <span>Approx. <span className="font-bold">${spot.averageCost}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FiClock className="text-adventure-600" />
                                        <span><span className="font-bold">{spot.travelDuration}</span> days</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FiUsers className="text-adventure-600" />
                                        <span><span className="font-bold">{spot.totalVisitors}</span> visitors/year</span>
                                    </div>
                                    <p className="text-sm text-gray-700">Season: <span className="font-bold">{spot.seasonality}</span></p>
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
            </div>
        </div>
    );
};

export default Featured;
