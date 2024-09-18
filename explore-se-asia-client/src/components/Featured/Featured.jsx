import { Link, useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import travelCostPng from '../../assets/travel.png'
import travelDurationPng from '../../assets/duration.png'

const Featured = () => {
    const touristSpots = useLoaderData();
    return (
        <div className="bg-gray-100 min-h-screen py-16 px-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-12 text-center">Featured Tourist Spots</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
                    {touristSpots.slice(0, 6).map((spot) => (
                        <div key={spot._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="relative">
                                <img src={spot.image} alt={spot.spotName} className="w-full h-52 object-cover" />
                                <div className="absolute flex items-center bottom-1 right-0 pr-4">
                                    <FaLocationDot className="text-white text-md font-medium mr-1" />
                                    <p className="text-white text-md font font-medium">{spot.location}, {spot.country}</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-3">{spot.spotName}</h2>
                                <div className="flex mb-2">
                                    <div className="flex items-center mr-10">
                                        <img className="h-6 mr-2" src={travelCostPng} alt="Travel Cost" />
                                        <p className="font-medium">Approx. {spot.averageCost}$</p>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="h-6 mr-2" src={travelDurationPng} alt="Travel Cost" />
                                        <p className="font-medium">{spot.travelDuration} Day/s</p>
                                    </div>
                                </div>
                                <p className=" font-medium mb-1">Visitors: {spot.totalVisitors}</p>

                                <p className="font-semibold">Travel Season: {spot.seasonality}</p>
                                <Link to={`/spot-details/${spot._id}`}>
                                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-medium">View Details</button>
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