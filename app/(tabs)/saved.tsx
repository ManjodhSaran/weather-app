import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Trash2, Info } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { clearAllData, getCityNames } from '@/services/storage';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function SavedScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const [data, setData] = useState<string[]>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    const getLocalData = async () => {
      try {
        const savedCities = await getCityNames();
        setData(savedCities);
      } catch (error) {
        console.error('Failed to fetch saved cities:', error);
      }
    };

    getLocalData();
  }, [isFocused]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={{ color: 'black' }}>{item}</Text>
        )}
        keyExtractor={(item) => item}
      />
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
