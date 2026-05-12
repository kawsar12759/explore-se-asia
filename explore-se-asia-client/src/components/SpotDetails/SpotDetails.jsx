import { useLoaderData, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FiHeart, FiCalendar, FiDollarSign, FiClock, FiUsers, FiShare2, FiMapPin } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ReviewSection from "../ReviewSection/ReviewSection";
import ImageGallery from "../ImageGallery/ImageGallery";
import BestTimeToVisit from "../BestTimeToVisit/BestTimeToVisit";
import SimilarSpots from "../SimilarSpots/SimilarSpots";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import { toast } from "react-toastify";

const SpotDetails = () => {
    const spot = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!spot) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">Destination not found</p>
                </div>
            </div>
        );
    }

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
            const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
            const response = await fetch(`${apiUrl}/wishlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(wishlistItem),
            });

            if (response.ok) {
                setIsWishlisted(true);
                toast.success("Added to wishlist!");
            } else if (response.status === 400) {
                toast.info("Already in your wishlist");
            } else {
                toast.error("Failed to add to wishlist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding to wishlist");
        }
    };

    const handleShare = async () => {
        const shareText = `Check out ${spot.spotName} in ${spot.country} on Explore SE Asia!`;
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: spot.spotName,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-96 sm:h-[500px] overflow-hidden">
                <img
                    src={spot.image}
                    alt={spot.spotName}
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Action Buttons - Top Right */}
                <div className="absolute top-6 right-6 flex gap-3 z-10">
                    <button
                        onClick={handleShare}
                        className="bg-white/90 backdrop-blur-md text-gray-800 p-3 rounded-full hover:bg-white transition-all hover:scale-110"
                        title="Share"
                    >
                        <FiShare2 size={20} />
                    </button>
                    <button
                        onClick={handleAddToWishlist}
                        className={`backdrop-blur-md p-3 rounded-full transition-all hover:scale-110 ${
                            isWishlisted
                                ? "bg-red-500 text-white"
                                : "bg-white/90 text-adventure-600 hover:bg-white"
                        }`}
                        title="Save to wishlist"
                    >
                        {isWishlisted ? (
                            <FaHeart size={20} />
                        ) : (
                            <FiHeart size={20} />
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
                {/* Breadcrumb & Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <FiMapPin size={16} className="text-adventure-500" />
                        <span>{spot.country}</span>
                        <span>•</span>
                        <span>{spot.location}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {spot.spotName}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-adventure flex items-center justify-center text-white font-bold text-sm">
                                {spot.userName?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <span className="text-sm">Added by <span className="font-semibold text-adventure-600">{spot.userName}</span></span>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-10 mb-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="mb-12">
                            <ImageGallery images={spot} spotName={spot.spotName} />
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Destination</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {spot.description}
                            </p>
                        </div>

                        {/* Key Details Grid */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-adventure-200 hover:shadow-lg transition-all">
                                    <div className="p-3 bg-adventure-100 rounded-lg text-adventure-600 flex-shrink-0">
                                        <FiUsers size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Annual Visitors</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{spot.totalVisitors}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-adventure-200 hover:shadow-lg transition-all">
                                    <div className="p-3 bg-adventure-100 rounded-lg text-adventure-600 flex-shrink-0">
                                        <FiDollarSign size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Average Cost Per Person</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">${spot.averageCost}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-adventure-200 hover:shadow-lg transition-all">
                                    <div className="p-3 bg-adventure-100 rounded-lg text-adventure-600 flex-shrink-0">
                                        <FiClock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Recommended Duration</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{spot.travelDuration} days</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-adventure-200 hover:shadow-lg transition-all">
                                    <div className="p-3 bg-adventure-100 rounded-lg text-adventure-600 flex-shrink-0">
                                        <FiCalendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Best Season to Visit</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{spot.seasonality}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-2xl p-8 text-white shadow-xl mb-8">
                                <h3 className="text-2xl font-bold mb-2">Ready to Explore?</h3>
                                <p className="text-adventure-50 mb-6">Start planning your adventure to {spot.spotName}</p>
                                <button
                                    onClick={() => navigate("/all-spots")}
                                    className="w-full bg-white text-adventure-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Explore More Spots
                                </button>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                        <span className="text-gray-600">Location</span>
                                        <span className="font-bold text-gray-900">{spot.country}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                        <span className="text-gray-600">Region</span>
                                        <span className="font-bold text-gray-900">{spot.location}</span>
                                    </div>
                                    {spot.spotType && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Type</span>
                                            <span className="font-bold text-adventure-600 bg-adventure-50 px-3 py-1 rounded-full text-sm">
                                                {spot.spotType}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Sections */}
                <div className="space-y-16">
                    {/* Weather Info */}
                    {spot && <WeatherInfo spot={spot} />}

                    {/* Best Time to Visit */}
                    {spot?.seasonalData && <BestTimeToVisit spot={spot} />}

                    {/* Reviews Section */}
                    <ReviewSection spotId={spot._id} spotName={spot.spotName} />

                    {/* Similar Spots */}
                    <SimilarSpots currentSpot={spot} />
                </div>
            </div>
        </div>
    );
};

export default SpotDetails;