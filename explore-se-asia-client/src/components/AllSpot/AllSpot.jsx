import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import travelCostPng from '../../assets/travel.png'
import travelDurationPng from '../../assets/duration.png'
const AllSpot = () => {
    const loadedSpots = useLoaderData();
    const [touristSpots, setTouristSpots] = useState(loadedSpots);
    const [dataLength, setDataLength] = useState(12);
    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-12 text-center">All Tourist Spots</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {touristSpots.slice(0, dataLength).map((spot) => (
                        <div key={spot._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="relative">
                                <img src={spot.image} alt={spot.spotName} className="w-full h-48 object-cover" />
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
                                        <p className="font-medium">{spot.travelDuration} Days</p>
                                    </div>
                                </div>
                                <p className=" font-medium mb-1">Visitors: {spot.totalVisitors}</p>

                                <p className="font-semibold">Seasonality: {spot.seasonality}</p>
                                <Link to={`/tourist-spot/${spot._id}`}>
                                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={dataLength >= touristSpots.length ? "hidden" : "mt-12 flex justify-center"}>
                    <button onClick={() => setDataLength(touristSpots.length)} className="btn bg-blue-500 text-white hover:bg-blue-600">Show All</button>
                </div>
            </div>
        </div>
    );
};

export default AllSpot;