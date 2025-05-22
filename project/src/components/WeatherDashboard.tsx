import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Thermometer, Wind, Search, AlertCircle, MapPin, Loader2 } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { fetchWeatherData } from '../utils/weatherApi';

export const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load weather data when component mounts or city changes
  useEffect(() => {
    const getWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      setSearchQuery('');
    }
  };

  const getWeatherIcon = (weatherCondition: string) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return <Sun className="text-amber-500" size={48} />;
      case 'clouds':
        return <Cloud className="text-gray-500" size={48} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="text-blue-500" size={48} />;
      default:
        return <Cloud className="text-gray-500" size={48} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Weather Dashboard</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a city name..."
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={40} />
            <p className="text-gray-600 dark:text-gray-300">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        ) : weatherData && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                {getWeatherIcon(weatherData.weather)}
                <div>
                  <h3 className="text-2xl font-bold">{Math.round(weatherData.temp)}°C</h3>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">{weatherData.weather}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-500 dark:text-gray-400" />
                <span className="text-xl font-medium">{weatherData.city}, {weatherData.country}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center transition-all">
                <Thermometer className="text-red-500 mb-2" size={24} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Feels Like</p>
                <p className="font-semibold text-lg">{Math.round(weatherData.feelsLike)}°C</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center transition-all">
                <Wind className="text-blue-500 mb-2" size={24} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Wind Speed</p>
                <p className="font-semibold text-lg">{weatherData.windSpeed} m/s</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center transition-all">
                <Cloud className="text-gray-500 mb-2" size={24} />
                <p className="text-gray-600 dark:text-gray-300 text-sm">Humidity</p>
                <p className="font-semibold text-lg">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};