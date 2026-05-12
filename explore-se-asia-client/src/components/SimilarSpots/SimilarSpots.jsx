import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiDollarSign, FiUsers } from 'react-icons/fi';

export default function SimilarSpots({ currentSpot }) {
  const [similarSpots, setSimilarSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentSpot) return;
    fetchSimilarSpots();
  }, [currentSpot]);

  const fetchSimilarSpots = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
      
      // Get all spots
      const res = await fetch(`${apiUrl}/spots`);
      const allSpots = await res.json();

      // Filter similar spots (same country or similar type)
      const similar = allSpots
        .filter(spot => 
          spot._id !== currentSpot._id && 
          (spot.country === currentSpot.country || spot.spotType === currentSpot.spotType)
        )
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 4); // Get top 4

      setSimilarSpots(similar);
    } catch (error) {
      console.log('Error fetching similar spots:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading recommendations...</div>;
  }

  if (similarSpots.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-adventure-gradient mb-6">
        ✨ You Might Also Like
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarSpots.map(spot => (
          <Link key={spot._id} to={`/spot-details/${spot._id}`}>
            <div className="card-adventure overflow-hidden h-full group cursor-pointer">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.spotName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-adventure-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {spot.spotType || 'Adventure'}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-adventure-500 transition-colors">
                  {spot.spotName}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FiMapPin className="text-adventure-500 flex-shrink-0" size={16} />
                  <span className="truncate">{spot.location}</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-adventure-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-adventure-600 font-bold">
                      <FiDollarSign size={14} />
                      ${spot.averageCost}
                    </div>
                  </div>
                  <div className="bg-adventure-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-adventure-600 font-bold">
                      <FiUsers size={14} />
                      {spot.totalVisitors}
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <button className="w-full btn-adventure-outline flex items-center justify-center gap-2 py-2 text-sm">
                  Explore
                  <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
