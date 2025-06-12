// Weather data model
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  icon: string;
  lastUpdated: string;
}

// API response type from VisualCrossing
export interface VisualCrossingResponse {
  resolvedAddress: string;
  description: string;
  currentConditions: {
    temp: number;
    conditions: string;
    humidity: number;
    windspeed: number;
    pressure: number;
    visibility: number;
    uvindex: number;
    feelslike: number;
    icon: string;
    datetime: string;
  };
}

// Cached weather data structure
export interface CachedWeatherData {
  city: string;
  data: WeatherData;
  timestamp: number;
}