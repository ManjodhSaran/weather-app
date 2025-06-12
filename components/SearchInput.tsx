import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface SearchInputProps {
  onSearch: (city: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [city, setCity] = useState('');
  const { theme } = useTheme();

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }
      ]}>
        <TextInput
          style={[
            styles.input,
            { color: theme.colors.text }
          ]}
          placeholder="Enter city name..."
          placeholderTextColor={theme.colors.textSecondary}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[
            styles.searchButton,
            { backgroundColor: theme.colors.primary }
          ]}
          onPress={handleSearch}
        >
          <Search size={20} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 12,
  },
  searchButton: {
    padding: 12,
    borderRadius: 12,
  },
});