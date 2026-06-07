import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';

const ItineraryCreate = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a trip title');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select start and end dates');
      return;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('End date must be after start date');
      return;
    }

    setLoading(true);
    try {
      const itineraryData = {
        userEmail: user?.email,
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itineraryData)
      });

      if (!response.ok) throw new Error('Failed to create itinerary');

      const result = await response.json();
      toast.success('Trip created successfully!');
      navigate(`/itinerary/${result.insertedId}`);
    } catch (error) {
      console.error('Error creating itinerary:', error);
      toast.error('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/itineraries')}
          className="flex items-center gap-2 text-adventure-600 hover:text-adventure-700 font-medium mb-8"
        >
          <FiArrowLeft size={20} /> Back to Itineraries
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Next Adventure</h1>
          <p className="text-gray-600 mb-8">Create a new trip itinerary for your Southeast Asia exploration</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Trip Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Bali & Lombok Adventure"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Trip Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add details about your trip plan..."
                className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500 resize-none"
                rows="4"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
            </div>

            {/* Date Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={18} />
                    Start Date *
                  </div>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={18} />
                    End Date *
                  </div>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Trip Duration Preview */}
            {formData.startDate && formData.endDate && new Date(formData.startDate) <= new Date(formData.endDate) && (
              <div className="bg-adventure-50 border border-adventure-200 rounded-lg p-4">
                <p className="text-sm text-adventure-700">
                  <span className="font-bold">Trip Duration:</span>{' '}
                  {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/itineraries')}
                className="flex-1 btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn btn-adventure"
              >
                {loading ? 'Creating...' : 'Create Trip'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCreate;
