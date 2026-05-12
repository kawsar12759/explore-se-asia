import { useEffect, useState } from 'react';
import { FiCloud, FiCloudRain, FiSun, FiWind, FiVolume2 } from 'react-icons/fi';

export default function WeatherInfo({ spot }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (spot?.location) {
      fetchWeather();
    }
  }, [spot?.location]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      
      // Geocode location using Nominatim API
      const locationCoords = await geocodeLocation(spot.location, spot.country);
      
      if (!locationCoords) {
        setLoading(false);
        return;
      }

      // Fetch weather using Open-Meteo API (free, no key required)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${locationCoords.lat}&longitude=${locationCoords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto&temperature_unit=celsius`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.daily) {
        setWeather({
          current: {
            temp: weatherData.daily.temperature_2m_max[0],
            minTemp: weatherData.daily.temperature_2m_min[0],
            precipitation: weatherData.daily.precipitation_sum[0],
            windSpeed: weatherData.daily.windspeed_10m_max[0],
            condition: weatherData.daily.precipitation_sum[0] > 5 ? 'Rainy' : 'Clear'
          },
          forecast: weatherData.daily
        });
      }
    } catch (error) {
      console.log('Weather data not available:', error);
    } finally {
      setLoading(false);
    }
  };

  // Geocode location using Nominatim (free, no API key required)
  const geocodeLocation = async (location, country) => {
    try {
      const query = `${location}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
      
      // Fallback: Try just location name
      const fallbackRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
      );
      const fallbackData = await fallbackRes.json();
      
      if (fallbackData && fallbackData.length > 0) {
        return {
          lat: parseFloat(fallbackData[0].lat),
          lon: parseFloat(fallbackData[0].lon)
        };
      }
      
      return null;
    } catch (error) {
      console.log('Geocoding error:', error);
      return null;
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition === 'Rainy') return <FiCloudRain className="text-blue-500" />;
    return <FiSun className="text-yellow-500" />;
  };

  if (loading) {
    return <div className="py-6 text-center text-gray-500">Loading weather data...</div>;
  }

  if (!weather) {
    return null;
  }

  const { current } = weather;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-adventure-gradient mb-6">
        🌤️ Current Weather
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Conditions */}
        <div className="card-adventure p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Right Now</h3>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-5xl font-bold text-adventure-500">{Math.round(current.temp)}°C</div>
              <p className="text-gray-600 font-semibold text-lg">{current.condition}</p>
            </div>
            <div className="text-6xl">
              {getWeatherIcon(current.condition)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <FiCloud className="text-blue-500 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium">Temperature</p>
                <p className="font-bold text-gray-900">{Math.round(current.minTemp)}°C - {Math.round(current.temp)}°C</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <FiVolume2 className="text-blue-500 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium">Rainfall</p>
                <p className="font-bold text-gray-900">{Math.round(current.precipitation)} mm</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <FiWind className="text-blue-500 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium">Wind Speed</p>
                <p className="font-bold text-gray-900">{Math.round(current.windSpeed)} km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Info & Tips */}
        <div className="card-adventure p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Tips</h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <p className="font-bold text-adventure-600 mb-1">☀️ Sun Protection</p>
              <p>Use high SPF sunscreen (SPF 50+) and wear a hat for extended outdoor activities</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <p className="font-bold text-adventure-600 mb-1">💧 Stay Hydrated</p>
              <p>Drink plenty of water throughout the day, especially during physical activities</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <p className="font-bold text-adventure-600 mb-1">👕 Dress Smart</p>
              <p>Wear light, breathable clothing. Consider quick-dry fabrics for water activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
