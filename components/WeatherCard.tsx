import { useTheme } from '@/hooks/useTheme';
import { WeatherData } from '@/models/Weather';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIcon } from '@/services/weatherApi';
import { Droplets, Wind, Gauge, Eye, Sun, Activity } from 'lucide-react-native';

interface WeatherCardProps {
  weather: WeatherData;
  loading?: boolean;
  error?: string | null;
}

export function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  const { theme } = useTheme();

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={[styles.location, { color: theme.colors.text }]}>
            {weather.location}
          </Text>
          <Text
            style={[styles.lastUpdated, { color: theme.colors.textSecondary }]}
          >
            Updated: {formatLastUpdated(weather.lastUpdated)}
          </Text>
        </View>
        <Text style={styles.weatherIcon}>{getWeatherIcon(weather.icon)}</Text>
      </View>

      <View style={styles.temperatureSection}>
        <Text style={[styles.temperature, { color: theme.colors.text }]}>
          {weather.temperature}°C
        </Text>
        <Text style={[styles.condition, { color: theme.colors.textSecondary }]}>
          {weather.condition}
        </Text>
        <Text style={[styles.feelsLike, { color: theme.colors.textSecondary }]}>
          Feels like {weather.feelsLike}°C
        </Text>
      </View>

      <View style={styles.detailsGrid}>
        <WeatherDetail
          icon={
            <Droplets size={20} color={theme.colors.info} strokeWidth={2} />
          }
          label="Humidity"
          value={`${weather.humidity}%`}
          theme={theme}
        />
        <WeatherDetail
          icon={
            <Wind size={20} color={theme.colors.secondary} strokeWidth={2} />
          }
          label="Wind Speed"
          value={`${weather.windSpeed} km/h`}
          theme={theme}
        />
        <WeatherDetail
          icon={
            <Gauge size={20} color={theme.colors.warning} strokeWidth={2} />
          }
          label="Pressure"
          value={`${weather.pressure} mb`}
          theme={theme}
        />
        <WeatherDetail
          icon={<Eye size={20} color={theme.colors.success} strokeWidth={2} />}
          label="Visibility"
          value={`${weather.visibility} km`}
          theme={theme}
        />
        <WeatherDetail
          icon={<Sun size={20} color={theme.colors.error} strokeWidth={2} />}
          label="UV Index"
          value={weather.uvIndex.toString()}
          theme={theme}
        />
        <WeatherDetail
          icon={
            <Activity size={20} color={theme.colors.primary} strokeWidth={2} />
          }
          label="Feels Like"
          value={`${weather.feelsLike}°C`}
          theme={theme}
        />
      </View>

      {loading && (
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: theme.colors.info }]}>
            Updating...
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: any;
}

function WeatherDetail({ icon, label, value, theme }: WeatherDetailProps) {
  return (
    <View
      style={[styles.detailItem, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.detailIcon}>{icon}</View>
      <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.detailValue, { color: theme.colors.text }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  locationContainer: {
    flex: 1,
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    fontWeight: '500',
  },
  weatherIcon: {
    fontSize: 48,
  },
  temperatureSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  condition: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  feelsLike: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailIcon: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
