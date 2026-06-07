import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiEdit2,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiMapPin,
  FiClock
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';

const ItineraryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [itinerary, setItinerary] = useState(null);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [addSpotData, setAddSpotData] = useState({
    spotId: '',
    date: '',
    notes: '',
    duration: 1
  });

  // Fetch itinerary and all spots
  useEffect(() => {
    fetchItinerary();
    fetchAllSpots();
  }, [id]);

  const fetchItinerary = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/${id}`);
      if (!response.ok) throw new Error('Failed to fetch itinerary');
      const data = await response.json();
      setItinerary(data);
      setEditFormData({
        title: data.title,
        description: data.description,
        startDate: data.startDate?.split('T')[0],
        endDate: data.endDate?.split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      toast.error('Failed to load itinerary');
      navigate('/itineraries');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSpots = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/spots`);
      if (!response.ok) throw new Error('Failed to fetch spots');
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      console.error('Error fetching spots:', error);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    if (!editFormData.title.trim()) {
      toast.error('Please enter a trip title');
      return;
    }
    if (new Date(editFormData.startDate) > new Date(editFormData.endDate)) {
      toast.error('End date must be after start date');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) throw new Error('Failed to update itinerary');
      toast.success('Trip details updated');
      setIsEditingDetails(false);
      fetchItinerary();
    } catch (error) {
      console.error('Error updating itinerary:', error);
      toast.error('Failed to update trip');
    }
  };

  const handleAddSpot = async (e) => {
    e.preventDefault();

    if (!addSpotData.spotId) {
      toast.error('Please select a destination');
      return;
    }
    if (!addSpotData.date) {
      toast.error('Please select a date');
      return;
    }

    // Check if spot already added
    if (itinerary.spots?.some(s => s.spotId === addSpotData.spotId)) {
      toast.error('This destination is already in your itinerary');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/${id}/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addSpotData)
      });

      if (!response.ok) throw new Error('Failed to add spot');
      toast.success('Destination added to itinerary');
      setAddSpotData({ spotId: '', date: '', notes: '', duration: 1 });
      setIsAddingSpot(false);
      fetchItinerary();
    } catch (error) {
      console.error('Error adding spot:', error);
      toast.error('Failed to add destination');
    }
  };

  const handleRemoveSpot = async (spotId) => {
    if (!window.confirm('Remove this destination from your itinerary?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/itineraries/${id}/spots/${spotId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to remove spot');
      toast.success('Destination removed');
      fetchItinerary();
    } catch (error) {
      console.error('Error removing spot:', error);
      toast.error('Failed to remove destination');
    }
  };

  const getSpotDetails = (spotId) => {
    return spots.find(s => s._id === spotId);
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
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-adventure-300 border-t-adventure-600"></div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Itinerary not found</p>
          <button
            onClick={() => navigate('/itineraries')}
            className="btn btn-adventure"
          >
            Back to Itineraries
          </button>
        </div>
      </div>
    );
  }

  const itinerarySpots = itinerary.spots || [];
  const sortedSpots = [...itinerarySpots].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/itineraries')}
          className="flex items-center gap-2 text-adventure-600 hover:text-adventure-700 font-medium mb-8"
        >
          <FiArrowLeft size={20} /> Back to Itineraries
        </button>

        {/* Trip Header Card */}
        <div className="bg-gradient-to-r from-adventure-500 to-adventure-600 text-white rounded-xl shadow-lg p-8 mb-8">
          {isEditingDetails ? (
            <form onSubmit={handleUpdateDetails} className="space-y-4">
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className="input w-full text-2xl font-bold focus:outline-none"
                placeholder="Trip Title"
              />
              <textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="textarea w-full focus:outline-none"
                placeholder="Trip Description"
                rows="2"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={editFormData.startDate}
                  onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                  className="input focus:outline-none"
                />
                <input
                  type="date"
                  value={editFormData.endDate}
                  onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                  className="input focus:outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn btn-sm bg-white text-adventure-600 hover:bg-gray-100">
                  <FiSave size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingDetails(false)}
                  className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-adventure-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
                  {itinerary.description && <p className="opacity-90">{itinerary.description}</p>}
                </div>
                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="btn btn-sm bg-white text-adventure-600 hover:bg-gray-100 whitespace-nowrap"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-white border-opacity-30">
                <div>
                  <p className="text-sm opacity-75">Start Date</p>
                  <p className="font-semibold flex items-center gap-1">
                    <FiCalendar size={16} /> {formatDate(itinerary.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-75">End Date</p>
                  <p className="font-semibold flex items-center gap-1">
                    <FiCalendar size={16} /> {formatDate(itinerary.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Duration</p>
                  <p className="font-semibold flex items-center gap-1">
                    <FiClock size={16} /> {getDaysDuration(itinerary.startDate, itinerary.endDate)} Days
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Destinations</p>
                  <p className="font-semibold flex items-center gap-1">
                    <FiMapPin size={16} /> {itinerarySpots.length}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Add Spot Section */}
        {!isAddingSpot ? (
          <button
            onClick={() => setIsAddingSpot(true)}
            className="btn btn-adventure gap-2 w-full mb-8"
          >
            <FiPlus size={20} /> Add Destination to Itinerary
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add Destination</h3>
              <button
                onClick={() => setIsAddingSpot(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSpot} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Select Destination *
                </label>
                <select
                  value={addSpotData.spotId}
                  onChange={(e) => setAddSpotData({ ...addSpotData, spotId: e.target.value })}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                >
                  <option value="">Choose a destination...</option>
                  {spots.map(spot => (
                    <option key={spot._id} value={spot._id}>
                      {spot.spotName} - {spot.country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={addSpotData.date}
                    onChange={(e) => setAddSpotData({ ...addSpotData, date: e.target.value })}
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                    min={editFormData.startDate}
                    max={editFormData.endDate}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={addSpotData.duration}
                    onChange={(e) => setAddSpotData({ ...addSpotData, duration: parseInt(e.target.value) || 1 })}
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={addSpotData.notes}
                  onChange={(e) => setAddSpotData({ ...addSpotData, notes: e.target.value })}
                  placeholder="Add activities, reservations, or other notes..."
                  className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-adventure-500"
                  rows="2"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 btn btn-adventure">
                  Add to Itinerary
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSpot(false)}
                  className="flex-1 btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Destinations Timeline */}
        {itinerarySpots.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Trip Timeline</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {sortedSpots.map((spotData, index) => {
                  const spotDetails = getSpotDetails(spotData.spotId);
                  return (
                    <div key={index} className="border-l-4 border-adventure-500 pl-6 pb-4 relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 w-4 h-4 bg-adventure-500 rounded-full border-4 border-white -translate-x-[10px]"></div>

                      {spotDetails ? (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{spotDetails.spotName}</h4>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <FiMapPin size={14} /> {spotDetails.country}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveSpot(spotData.spotId)}
                              className="btn btn-sm btn-outline btn-error gap-1"
                            >
                              <FiTrash2 size={14} /> Remove
                            </button>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 mt-3 mb-3 text-sm">
                            <div>
                              <p className="text-gray-600 text-xs">Date</p>
                              <p className="font-semibold flex items-center gap-1">
                                <FiCalendar size={14} /> {formatDate(spotData.date)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs">Duration</p>
                              <p className="font-semibold flex items-center gap-1">
                                <FiClock size={14} /> {spotData.duration} day{spotData.duration > 1 ? 's' : ''}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs">Est. Cost</p>
                              <p className="font-semibold">${(spotDetails.averageCost || 0) * spotData.duration}</p>
                            </div>
                          </div>

                          {spotData.notes && (
                            <div className="bg-white rounded p-3 border border-gray-200 mt-2">
                              <p className="text-xs text-gray-600 font-medium mb-1">Notes:</p>
                              <p className="text-sm text-gray-700">{spotData.notes}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <p className="text-red-700 text-sm">Destination not found (ID: {spotData.spotId})</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiMapPin className="mx-auto mb-4 text-gray-300" size={48} />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Destinations Yet</h3>
            <p className="text-gray-600">Add destinations to start building your itinerary</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryDetails;
