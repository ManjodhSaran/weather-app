import { View, Text, StyleSheet } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export function PlaceholderCard() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.iconContainer}>
        <Search size={48} color={theme.colors.primary} strokeWidth={2} />
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Search for Weather
      </Text>
      
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Enter a city name above to get current weather information
      </Text>
      
      <View style={styles.examplesContainer}>
        <Text style={[styles.examplesTitle, { color: theme.colors.textSecondary }]}>
          Try searching for:
        </Text>
        
        <View style={styles.examplesList}>
          {['London', 'New York', 'Tokyo', 'Paris'].map((city, index) => (
            <View key={city} style={[styles.exampleItem, { backgroundColor: theme.colors.background }]}>
              <MapPin size={16} color={theme.colors.primary} strokeWidth={2} />
              <Text style={[styles.exampleText, { color: theme.colors.text }]}>
                {city}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  examplesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  examplesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});