import { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'theme_preference';

type Theme = {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    border: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
};

const lightTheme: Theme = {
  colors: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    secondary: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E2E8F0',
    text: '#1E293B',
    textSecondary: '#64748B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#60A5FA',
    primaryDark: '#3B82F6',
    secondary: '#94A3B8',
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    border: '#475569',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#22D3EE',
  },
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored !== null) {
        setIsDark(stored === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback theme when context is not available
    const systemColorScheme = useColorScheme();
    const isDark = systemColorScheme === 'dark';
    return {
      theme: isDark ? darkTheme : lightTheme,
      isDark,
      toggleTheme: () => {},
    };
  }
  return context;
}