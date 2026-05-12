import { FiCloud, FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

export default function BestTimeToVisit({ spot }) {
  // Only show if data is provided from the spot
  const seasonalData = spot?.seasonalData;

  // Don't render if no data
  if (!seasonalData || seasonalData.length === 0) {
    return null;
  }

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Peak Season': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriceColor = (level) => {
    switch (level) {
      case 'Budget': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeasonBg = (season) => {
    if (season.includes('Dry')) return 'bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500';
    if (season.includes('Shoulder')) return 'bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-500';
    return 'bg-gradient-to-br from-blue-50 to-green-50 border-l-4 border-blue-500';
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-adventure-gradient mb-6">
        📅 Best Time to Visit
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {seasonalData.map((season, idx) => (
          <div key={idx} className={`card-adventure p-6 ${getSeasonBg(season.season)}`}>
            {/* Season Header */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{season.season}</h3>
              <p className="text-sm text-gray-600 font-semibold">{season.months}</p>
            </div>

            {/* Weather */}
            <div className="mb-4 pb-4 border-b border-gray-300">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <FiCloud className="text-adventure-500 text-lg" />
                <span className="font-semibold text-sm">Weather</span>
              </div>
              <p className="text-sm text-gray-600">{season.weather}</p>
            </div>

            {/* Crowds & Price */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-300">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <FiUsers className="text-adventure-500" size={16} />
                  <span className="text-xs font-semibold text-gray-700">Crowds</span>
                </div>
                <p className={`text-sm font-bold ${getCrowdColor(season.crowds)}`}>
                  {season.crowds}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <FiDollarSign className="text-adventure-500" size={16} />
                  <span className="text-xs font-semibold text-gray-700">Price</span>
                </div>
                <p className={`text-sm font-bold ${getPriceColor(season.price)}`}>
                  {season.price}
                </p>
              </div>
            </div>

            {/* Activities */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Activities</p>
              <div className="space-y-1">
                {season.activities?.map((activity, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCheckCircle className="text-adventure-500" size={14} />
                    {activity}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white/50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-600 font-semibold">Best Rating</p>
              <p className="text-xl font-bold text-adventure-500">{season.rating}/10</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-6 card-adventure p-6 bg-gradient-to-r from-adventure-50 to-adventure-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Travel Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-adventure-500 font-bold">•</span>
            <span>Book accommodations 2-3 months in advance during peak season</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-adventure-500 font-bold">•</span>
            <span>Consider shoulder seasons for fewer crowds and better prices</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-adventure-500 font-bold">•</span>
            <span>Wet season offers lush landscapes and unique experiences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-adventure-500 font-bold">•</span>
            <span>Pack accordingly based on weather conditions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
