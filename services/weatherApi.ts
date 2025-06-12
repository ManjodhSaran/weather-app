import { WeatherData, VisualCrossingResponse } from '@/models/Weather';

// VisualCrossing API configuration
const API_KEY = '8ZETXXRC55JUCBVBSRAXPNL7K';
const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Weather service following MVVM pattern (Model layer)
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  if (!city.trim()) {
    throw new Error('City name is required');
  }

  const url = `${BASE_URL}/${encodeURIComponent(
    city
  )}/today?unitGroup=metric&key=${API_KEY}&include=current`;

  try {
    console.log(`Fetching weather data for city: ${city}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          'City not found. Please check the spelling and try again.'
        );
      } else if (response.status === 401) {
        throw new Error(
          'API key is invalid. Please configure a valid VisualCrossing API key.'
        );
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Weather service error: ${response.status}`);
      }
    }

    const data: VisualCrossingResponse = await response.json();

    if (!data.currentConditions) {
      throw new Error('Invalid weather data received');
    }

    // Transform API response to our weather data model
    return transformWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your internet connection.');
  }
}

function transformWeatherData(apiData: VisualCrossingResponse): WeatherData {
  const { currentConditions } = apiData;

  return {
    location: apiData.resolvedAddress,
    temperature: Math.round(currentConditions.temp),
    condition: currentConditions.conditions,
    description: apiData.description || currentConditions.conditions,
    humidity: Math.round(currentConditions.humidity),
    windSpeed: Math.round(currentConditions.windspeed * 10) / 10, // Round to 1 decimal
    pressure: Math.round(currentConditions.pressure),
    visibility: Math.round(currentConditions.visibility * 10) / 10,
    uvIndex: Math.round(currentConditions.uvindex * 10) / 10,
    feelsLike: Math.round(currentConditions.feelslike),
    icon: currentConditions.icon,
    lastUpdated: new Date().toISOString(),
  };
}

// Weather icon mapping for UI
export function getWeatherIcon(iconCode: string): string {
  const iconMap: { [key: string]: string } = {
    'clear-day': '☀️',
    'clear-night': '🌙',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '☁️',
    cloudy: '☁️',
    rain: '🌧️',
    snow: '❄️',
    sleet: '🌨️',
    wind: '💨',
    fog: '🌫️',
    thunder: '⛈️',
    thunderstorm: '⛈️',
    hail: '🌨️',
  };

  return iconMap[iconCode] || '🌤️';
}
