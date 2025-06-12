import { useTheme } from '@/hooks/useTheme';
import { useWeather } from '@/hooks/useWeather';
import React, { useCallback, useMemo } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { WeatherCard } from '@/components/WeatherCard';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderCard } from '@/components/PlaceholderCard';
import { ThoughtOfTheDay } from '@/components/ThoughtOfTheDay';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { weather, loading, error, searchCity, refreshWeather, isRefreshing } =
    useWeather();

  // Memoize handlers to prevent unnecessary re-renders
  const handleSearch = useCallback(
    (city: string) => {
      searchCity(city);
    },
    [searchCity]
  );

  const handleRefresh = useCallback(() => {
    refreshWeather();
  }, [refreshWeather]);

  // Memoize refresh control to prevent recreation on every render
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor={theme.colors.primary}
        colors={[theme.colors.primary]}
        progressBackgroundColor={theme.colors.surface}
      />
    ),
    [isRefreshing, handleRefresh, theme.colors.primary, theme.colors.surface]
  );

  // Render content based on state
  const renderMainContent = () => {
    // Loading state (initial load)
    if (loading && !weather) {
      return <LoadingSpinner />;
    }

    // Error state (no weather data)
    if (error && !weather) {
      return <ErrorMessage message={error} onRetry={handleRefresh} />;
    }

    // Weather data available
    if (weather) {
      return <WeatherCard weather={weather} loading={loading} error={error} />;
    }

    // Empty state
    return <PlaceholderCard />;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: theme.colors.background },
        ]}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <SearchInput onSearch={handleSearch} />
        </View>

        <View style={styles.mainContent}>{renderMainContent()}</View>

        <View style={styles.footer}>
          <ThoughtOfTheDay />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
    marginBottom: 16,
    minHeight: 200,
  },
  footer: {
    marginTop: 'auto',
  },
});
