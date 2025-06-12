import { useState, useEffect, useCallback, useRef } from 'react';
import { WeatherData } from '@/models/Weather';
import { fetchWeatherData } from '@/services/weatherApi';
import { getLastSearchedWeather, saveWeatherData } from '@/services/storage';

// Custom hook following MVVM pattern (ViewModel)
export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);

  // Debouncing
  const debounceTimer = useRef<number | null>(null);

  // Load cached weather data on app start
  useEffect(() => {
    loadCachedWeather();
  }, []);

  const loadCachedWeather = async () => {
    try {
      const cachedWeather = await getLastSearchedWeather();
      if (cachedWeather) {
        setWeather(cachedWeather.data);
        setLastSearchedCity(cachedWeather.city);
      }
    } catch (error) {
      console.error('Error loading cached weather:', error);
    }
  };

  const searchCity = useCallback((city: string) => {
    // Clear previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce the API call by 500ms
    debounceTimer.current = window.setTimeout(async () => {
      if (!city.trim()) {
        setError('Please enter a city name');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const weatherData = await fetchWeatherData(city);
        setWeather(weatherData);
        setLastSearchedCity(city);

        // Cache the weather data
        await saveWeatherData(city, weatherData);
      } catch (error) {
        setWeather(null);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to fetch weather data';
        setError(errorMessage);

        // If it's a network error and we have cached data, show that instead
        if (
          errorMessage.includes('network') ||
          errorMessage.includes('fetch')
        ) {
          const cachedWeather = await getLastSearchedWeather();
          if (
            cachedWeather &&
            cachedWeather.city.toLowerCase() === city.toLowerCase()
          ) {
            setWeather(cachedWeather.data);
            setError('Showing cached data. Check your internet connection.');
          }
        }
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay
  }, []);

  const refreshWeather = useCallback(async () => {
    if (!lastSearchedCity) {
      // Try to load cached weather if no city was searched yet
      await loadCachedWeather();
      return;
    }

    setIsRefreshing(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherData(lastSearchedCity);
      setWeather(weatherData);

      // Update cache
      await saveWeatherData(lastSearchedCity, weatherData);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to refresh weather data';
      setError(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  }, [lastSearchedCity]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    weather,
    loading,
    error,
    isRefreshing,
    searchCity,
    refreshWeather,
  };
}
