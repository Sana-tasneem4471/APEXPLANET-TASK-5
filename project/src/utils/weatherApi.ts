import { WeatherData } from '../types/weather';

// OpenWeatherMap API key (using a free tier API key)
const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weather: data.weather[0].main,
      description: data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};