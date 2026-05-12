import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiMapPin, FiCamera, FiEdit, FiMail, FiCalendar } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

export default function UserProfile() {
  const { email } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [spots, setSpots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [spotCount, setSpotCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, spots, reviews

  useEffect(() => {
    fetchUserProfile();
  }, [email]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
      
      // Get user profile
      const profileRes = await fetch(`${apiUrl}/users/${email}`);
      const profileData = await profileRes.json();
      setProfile(profileData);
      setFormData(profileData);

      // Get user's spots
      const spotsRes = await fetch(`${apiUrl}/spots/byuser/${email}`);
      const spotsData = await spotsRes.json();
      setSpots(Array.isArray(spotsData) ? spotsData : []);
      setSpotCount(spotsData.length || 0);

      // Get user's reviews
      const reviewsRes = await fetch(`${apiUrl}/reviews/user/${email}`);
      const reviewsData = await reviewsRes.json();
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      setReviewCount(reviewsData.length || 0);
    } catch (error) {
      console.log('Profile data not yet created');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://explore-se-asia-server.vercel.app';
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email,
          updatedAt: new Date()
        })
      });

      if (response.ok) {
        setProfile(formData);
        setIsEditing(false);
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile',
        icon: 'error'
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const isOwnProfile = user?.email === email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="card-adventure bg-white p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {isEditing ? (
                <div>
                  <img
                    src={formData?.profilePhoto || `https://ui-avatars.com/api/?name=${formData?.name || 'User'}&background=f26c28&color=fff&size=128`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-adventure-200"
                  />
                  <input
                    type="url"
                    name="profilePhoto"
                    value={formData?.profilePhoto || ''}
                    onChange={handleInputChange}
                    placeholder="Photo URL"
                    className="mt-3 w-full px-3 py-2 border-2 border-adventure-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adventure-500 text-sm"
                  />
                </div>
              ) : (
                <img
                  src={profile?.profilePhoto || `https://ui-avatars.com/api/?name=${profile?.name || 'User'}&background=f26c28&color=fff&size=128`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-adventure-300 shadow-lg"
                />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border-2 border-adventure-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  />
                  <textarea
                    name="bio"
                    value={formData?.bio || ''}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    className="w-full px-4 py-2 border-2 border-adventure-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adventure-500"
                    rows="3"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData?.location || ''}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="w-full px-4 py-2 border-2 border-adventure-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  />
                  <div className="flex gap-3">
                    <button onClick={handleSaveProfile} className="btn-adventure">
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profile);
                      }}
                      className="btn-adventure-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile?.name || 'Traveler'}
                  </h1>
                  <p className="text-gray-600 mb-4">{profile?.bio || 'No bio yet'}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiMapPin className="text-adventure-500" />
                        {profile.location}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiMail className="text-adventure-500" />
                      {email}
                    </div>
                    {profile?.joinedAt && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiCalendar className="text-adventure-500" />
                        Joined {new Date(profile.joinedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {isOwnProfile && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-adventure flex items-center gap-2"
                    >
                      <FiEdit /> Edit Profile
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="card-adventure p-6 text-center cursor-pointer hover:bg-adventure-50" onClick={() => setActiveTab('overview')}>
            <div className="text-3xl font-bold text-adventure-500">{spotCount}</div>
            <div className="text-gray-600 text-sm mt-2">Spots Added</div>
          </div>
          <div className="card-adventure p-6 text-center cursor-pointer hover:bg-adventure-50" onClick={() => setActiveTab('reviews')}>
            <div className="text-3xl font-bold text-adventure-500">{reviewCount}</div>
            <div className="text-gray-600 text-sm mt-2">Reviews</div>
          </div>
          <div className="card-adventure p-6 text-center">
            <div className="text-3xl font-bold text-adventure-500">⭐</div>
            <div className="text-gray-600 text-sm mt-2">Explorer</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'overview'
                ? 'text-adventure-600 border-b-4 border-adventure-500'
                : 'text-gray-600 hover:text-adventure-500'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('spots')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'spots'
                ? 'text-adventure-600 border-b-4 border-adventure-500'
                : 'text-gray-600 hover:text-adventure-500'
            }`}
          >
            Saved Spots
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'reviews'
                ? 'text-adventure-600 border-b-4 border-adventure-500'
                : 'text-gray-600 hover:text-adventure-500'
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="card-adventure p-6">
            <h2 className="text-xl font-bold text-adventure-gradient mb-4">About This Traveler</h2>
            <div className="space-y-3 text-gray-700">
              <p>✈️ Passionate about exploring Southeast Asia</p>
              <p>🗺️ Shared {spotCount} amazing destinations</p>
              <p>💬 Written {reviewCount} insightful reviews</p>
              <p>❤️ Helping fellow travelers discover hidden gems</p>
            </div>
          </div>
        )}

        {activeTab === 'spots' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Spots ({spotCount})</h2>
            {spots.length === 0 ? (
              <div className="card-adventure p-12 text-center bg-gray-50">
                <p className="text-gray-600 mb-4">No spots added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spots.map(spot => (
                  <div key={spot._id} className="card-adventure overflow-hidden">
                    <img src={spot.image} alt={spot.spotName} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{spot.spotName}</h3>
                      <p className="text-sm text-gray-600 mb-3">{spot.location}, {spot.country}</p>
                      <div className="flex gap-4 text-xs">
                        <div><span className="font-bold text-adventure-600">${spot.averageCost}</span> cost</div>
                        <div><span className="font-bold text-adventure-600">{spot.totalVisitors}</span> visitors</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Review History ({reviewCount})</h2>
            {reviews.length === 0 ? (
              <div className="card-adventure p-12 text-center bg-gray-50">
                <p className="text-gray-600 mb-4">No reviews written yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="card-adventure p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{review.spotName}</h3>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? '⭐' : '☆'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{review.comment}</p>
                    <div className="text-sm text-adventure-600 font-semibold">❤️ {review.likes || 0} likes</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
