import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEdit2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';

const Itinerary = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      toast.error('Please log in to view itineraries');
      navigate('/login');
      return;
    }

    fetchItineraries();
  }, [user?.email, navigate]);

  const fetchItineraries = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/user/${user?.email}`);
      if (!response.ok) throw new Error('Failed to fetch itineraries');
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      toast.error('Failed to load itineraries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete itinerary');
      setItineraries(itineraries.filter(i => i._id !== id));
      toast.success('Itinerary deleted successfully');
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      toast.error('Failed to delete itinerary');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-adventure-300 border-t-adventure-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trip Itineraries</h1>
            <p className="text-gray-600">Plan and organize your Southeast Asia adventures</p>
          </div>
          <Link
            to="/itinerary/create"
            className="btn btn-adventure gap-2 whitespace-nowrap"
          >
            <FiPlus size={20} /> Create New Trip
          </Link>
        </div>

        {/* Empty State */}
        {itineraries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FiCalendar className="mx-auto mb-4 text-adventure-300" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Itineraries Yet</h3>
            <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
            <Link
              to="/itinerary/create"
              className="btn btn-adventure gap-2"
            >
              <FiPlus size={18} /> Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map(itinerary => (
              <div
                key={itinerary._id}
                className="card-adventure bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-adventure-500 to-adventure-600 text-white p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{itinerary.title}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <FiCalendar size={16} />
                    <span>{getDaysDuration(itinerary.startDate, itinerary.endDate)} Days</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {itinerary.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{itinerary.description}</p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-700 w-20">From:</span>
                      <span className="text-gray-600">{formatDate(itinerary.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-700 w-20">To:</span>
                      <span className="text-gray-600">{formatDate(itinerary.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="text-adventure-500" size={16} />
                      <span className="text-gray-600">{itinerary.spots?.length || 0} Destinations</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/itinerary/${itinerary._id}`}
                      className="flex-1 btn btn-sm btn-adventure gap-2"
                    >
                      <FiEdit2 size={16} /> View & Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(itinerary._id)}
                      className="flex-1 btn btn-sm btn-outline btn-error gap-2"
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
