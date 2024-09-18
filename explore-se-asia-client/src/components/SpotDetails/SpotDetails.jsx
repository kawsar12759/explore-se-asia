import { useLoaderData } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
const SpotDetails = () => {
    const spot = useLoaderData();
    return (
        <div className="bg-gray-100 ">
            <div className="max-w-4xl mx-auto p-14">
                
                <h2 className="text-4xl font-bold mb-2">{spot.spotName}</h2>
                <div className="flex text-gray-600 items-center mb-3">
                    <FaLocationDot className="text-lg font-medium mr-1" />
                    <p className="text-lg font font-medium">{spot.location}, {spot.country}</p>
                </div>

                <img src={spot.image} alt={spot.spotName} className="w-full rounded-lg object-cover" />
                <div className="flex justify-end mt-2">
                    <p>Added By: <span className="text-blue-500 cursor-pointer">{spot.userName}</span></p>
                </div>
                <p className="mt-4 mb-3">{spot.description}</p>
                <p className="mb-1"><b>Visited By: </b>{spot.totalVisitors} People per year</p>
                <p className="mb-1"><b>Travel Cost: </b>{spot.averageCost} US$</p>
                <p className="mb-1"><b>Travel Duration: </b>{spot.travelDuration} Day/s</p>
                <p className="mb-1"><b>Travel Season: </b>{spot.seasonality}</p>
            </div >
        </div >
    );
};

export default SpotDetails;