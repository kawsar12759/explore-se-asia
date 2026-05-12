import { useState, useContext, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const ReviewSection = ({ spotId, spotName, onAddReview }) => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch reviews when component mounts or spotId changes
    useEffect(() => {
        fetchReviews();
    }, [spotId]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
            const response = await fetch(`${apiUrl}/reviews/${spotId}`);
            
            if (response.ok) {
                const data = await response.json();
                setReviews(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please log in to add a review");
            return;
        }

        if (rating === 0 || comment.trim() === "") {
            toast.error("Please provide both a rating and comment");
            return;
        }

        const newReview = {
            spotId,
            spotName,
            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            userPhoto: user.photoURL,
            rating,
            comment,
            date: new Date().toLocaleDateString(),
            likes: 0,
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
            const response = await fetch(`${apiUrl}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                const result = await response.json();
                setReviews([...reviews, result]);
                setRating(0);
                setComment("");
                toast.success("Review added successfully!");
                if (onAddReview) onAddReview();
            }
        } catch (error) {
            toast.error("Failed to add review");
            console.error(error);
        }
    };

    const handleLike = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews[index].likes += 1;
        setReviews(updatedReviews);
    };

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    return (
        <div className="mt-8 sm:mt-12 border-t-2 border-adventure-100 pt-8">
            {/* Rating Summary */}
            <div className="bg-gradient-to-br from-adventure-50 to-explore-50 rounded-2xl p-6 sm:p-8 mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-adventure-600 mb-6">
                    Reviews & Ratings
                </h3>

                <div className="flex items-center gap-4 mb-8">
                    <div>
                        <p className="text-4xl sm:text-5xl font-bold text-adventure-600">
                            {averageRating}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`text-lg ${
                                            i < Math.round(averageRating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600">
                                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Add Review Form */}
                {user ? (
                    <form onSubmit={handleAddReview} className="bg-white rounded-xl p-6 sm:p-8">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Share Your Experience</h4>

                        {/* Star Rating */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                How would you rate this spot?
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        className="transition-transform duration-200 hover:scale-110"
                                    >
                                        <FiStar
                                            className={`text-3xl ${
                                                star <= (hoveredStar || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-sm text-adventure-600 mt-2">
                                    You rated: {rating} star{rating !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>

                        {/* Comment */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Review (Min 10 characters)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell other travelers about your experience..."
                                className="w-full h-32 p-4 border-2 border-adventure-200 rounded-lg focus:outline-none focus:border-adventure-500 resize-none text-gray-700"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                {comment.length} / 500 characters
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn-adventure w-full sm:w-auto font-bold"
                        >
                            Post Review
                        </button>
                    </form>
                ) : (
                    <div className="bg-white rounded-xl p-6 text-center">
                        <p className="text-gray-600 mb-4">
                            Sign in to share your experience with this destination
                        </p>
                    </div>
                )}
            </div>

            {/* Reviews List */}
            <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                    Traveler Reviews ({reviews.length})
                </h4>

                {loading ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">
                            No reviews yet. Be the first to share your experience!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="card-adventure p-6 sm:p-8"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={review.userPhoto || "https://i.ibb.co.com/St8w19S/user.png"}
                                            alt={review.userName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-bold text-gray-800">{review.userName}</p>
                                            <p className="text-xs text-gray-500">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`text-sm ${
                                                    i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    {review.comment}
                                </p>

                                <button
                                    onClick={() => handleLike(index)}
                                    className="flex items-center gap-2 text-adventure-600 hover:text-adventure-700 transition-colors duration-200"
                                >
                                    <FaHeart className="text-sm" />
                                    <span className="text-sm font-semibold">
                                        {review.likes} {review.likes === 1 ? "like" : "likes"}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
