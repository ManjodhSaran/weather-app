import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData, CachedWeatherData } from '@/models/Weather';

const WEATHER_CACHE_KEY = 'weather_cache';
const CACHE_EXPIRY_HOURS = 1; // Cache expires after 1 hour

// Storage service following MVVM pattern (Model layer)
export async function saveWeatherData(
  city: string,
  weatherData: WeatherData
): Promise<void> {
  try {
    const cacheData: CachedWeatherData = {
      city: city.toLowerCase().trim(),
      data: weatherData,
      timestamp: Date.now(),
    };

    console.log(
      `Saving weather data to cache for city: ${cacheData.city}`,
      cacheData
    );

    await AsyncStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving weather data to cache:', error);
    throw new Error('Failed to save weather data');
  }
}

export async function getLastSearchedWeather(): Promise<CachedWeatherData | null> {
  try {
    const cachedData = await AsyncStorage.getItem(WEATHER_CACHE_KEY);

    if (!cachedData) {
      return null;
    }

    const parsed: CachedWeatherData = JSON.parse(cachedData);

    // Check if cache is still valid (within expiry time)
    const now = Date.now();
    const cacheAge = now - parsed.timestamp;
    const maxAge = CACHE_EXPIRY_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds

    if (cacheAge > maxAge) {
      // Cache is expired, remove it
      await AsyncStorage.removeItem(WEATHER_CACHE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error getting cached weather data:', error);
    return null;
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([WEATHER_CACHE_KEY, 'theme_preference']);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw new Error('Failed to clear data');
  }
}

export async function isCacheExpired(): Promise<boolean> {
  try {
    const cachedData = await getLastSearchedWeather();
    return cachedData === null;
  } catch (error) {
    return true;
  }
}
