import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Trash2, Info } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { clearAllData } from '@/services/storage';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will remove all cached weather data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('Success', 'Cache cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About Weather App',
      'A beautiful weather app built with React Native and Expo.\n\nFeatures:\n• City-based weather search\n• Offline caching\n• Dark/Light theme\n• Pull-to-refresh\n• MVVM architecture\n\nAPI: VisualCrossing Weather',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            Appearance
          </Text>
          
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}
            onPress={toggleTheme}
          >
            <View style={styles.settingLeft}>
              {isDark ? (
                <Moon size={24} color={theme.colors.text} strokeWidth={2} />
              ) : (
                <Sun size={24} color={theme.colors.text} strokeWidth={2} />
              )}
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            Data
          </Text>
          
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}
            onPress={handleClearCache}
          >
            <View style={styles.settingLeft}>
              <Trash2 size={24} color={theme.colors.error} strokeWidth={2} />
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                Clear Cache
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            About
          </Text>
          
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.colors.surface }]}
            onPress={showAbout}
          >
            <View style={styles.settingLeft}>
              <Info size={24} color={theme.colors.text} strokeWidth={2} />
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                About
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});