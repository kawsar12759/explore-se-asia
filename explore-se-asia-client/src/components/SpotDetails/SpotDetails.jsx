import { useLoaderData, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FiHeart, FiCalendar, FiDollarSign, FiClock, FiUsers } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ReviewSection from "../ReviewSection/ReviewSection";
import { toast } from "react-toastify";

const SpotDetails = () => {
    const spot = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToWishlist = async () => {
        if (!user) {
            toast.error("Please log in to add to wishlist");
            navigate("/login");
            return;
        }

        const wishlistItem = {
            userEmail: user.email,
            spotId: spot._id,
            spotName: spot.spotName,
            country: spot.country,
            image: spot.image,
            addedAt: new Date(),
        };

        try {
            const response = await fetch("http://localhost:5000/wishlists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(wishlistItem),
            });

            if (response.ok) {
                setIsWishlisted(true);
                toast.success("Added to wishlist!");
            } else {
                toast.error("Failed to add to wishlist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding to wishlist");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-adventure-600 mb-3">
                                {spot.spotName}
                            </h2>
                            <div className="flex text-gray-600 items-center gap-2 mb-4">
                                <FaLocationDot className="text-lg text-adventure-500" />
                                <p className="text-base sm:text-lg font-medium">
                                    {spot.location}, {spot.country}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddToWishlist}
                            className={`btn btn-circle ${
                                isWishlisted
                                    ? "bg-red-500 text-white"
                                    : "bg-adventure-100 text-adventure-600 hover:bg-adventure-200"
                            } transition-all duration-200 flex-shrink-0`}
                        >
                            {isWishlisted ? (
                                <FaHeart className="text-xl" />
                            ) : (
                                <FiHeart className="text-xl" />
                            )}
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Added by: <span className="font-semibold text-adventure-600">{spot.userName}</span>
                    </p>
                </div>

                {/* Main Image */}
                <div className="mb-8">
                    <img
                        src={spot.image}
                        alt={spot.spotName}
                        className="w-full h-96 sm:h-[500px] object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <div className="card-adventure p-4 sm:p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <FiUsers className="text-2xl text-adventure-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Annual Visitors</p>
                        <p className="text-lg sm:text-2xl font-bold text-adventure-600">
                            {spot.totalVisitors}
                        </p>
                    </div>

                    <div className="card-adventure p-4 sm:p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <FiDollarSign className="text-2xl text-adventure-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg Cost</p>
                        <p className="text-lg sm:text-2xl font-bold text-adventure-600">
                            ${spot.averageCost}
                        </p>
                    </div>

                    <div className="card-adventure p-4 sm:p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <FiClock className="text-2xl text-adventure-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Duration</p>
                        <p className="text-lg sm:text-2xl font-bold text-adventure-600">
                            {spot.travelDuration}d
                        </p>
                    </div>

                    <div className="card-adventure p-4 sm:p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <FiCalendar className="text-2xl text-adventure-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Best Season</p>
                        <p className="text-sm sm:text-base font-bold text-adventure-600 truncate">
                            {spot.seasonality}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Destination</h3>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        {spot.description}
                    </p>
                </div>

                {/* Reviews Section */}
                <ReviewSection spotId={spot._id} spotName={spot.spotName} />
            </div>
        </div>
    );
};

export default SpotDetails;