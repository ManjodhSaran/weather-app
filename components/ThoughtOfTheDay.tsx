import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Lightbulb, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

const thoughts = [
  'Every storm runs out of rain, and every cloudy day leads to sunshine.',
  'Like weather, life has seasons. Embrace each one with grace.',
  "The sun always shines above the clouds, even when we can't see it.",
  "After every storm, there's a rainbow waiting to appear.",
  'Weather changes, but your inner sunshine can remain constant.',
  "Just as nature adapts to weather, we too can adapt to life's changes.",
  "A rainy day is nature's way of washing the world clean for tomorrow.",
  'The wind may blow, but a strong tree bends without breaking.',
  'Every sunrise is a reminder that we can start fresh each day.',
  'Like snowflakes, every day is unique and beautiful in its own way.',
  'Embrace the rain; it nourishes the earth and helps us grow.',
  'Clouds may cover the sky, but they can never dim your inner light.',
  'Just as the weather changes, so can our perspective on life.',
  'A clear sky follows a storm, reminding us that challenges pass.',
  'The beauty of weather lies in its unpredictability; embrace the surprise.',
  'Gentle breezes remind us that sometimes the smallest changes bring the greatest peace.',
  'Thunder announces the storm, but lightning illuminates the path forward.',
  'Morning dew teaches us that even the smallest drops can refresh the world.',
  'Autumn leaves show us that letting go can be beautiful.',
  'Winter teaches patience; spring rewards it with new life.',
];

export function ThoughtOfTheDay() {
  const { theme } = useTheme();
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Get consistent daily thought
  const getDailyThought = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return dayOfYear % thoughts.length;
  };

  useEffect(() => {
    setCurrentThoughtIndex(getDailyThought());
  }, []);

  const handleRefresh = () => {
    // Animate out
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Get random thought different from current
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * thoughts.length);
    } while (newIndex === currentThoughtIndex && thoughts.length > 1);

    setTimeout(() => {
      setCurrentThoughtIndex(newIndex);
    }, 150);
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    title: {
      color: theme.colors.text,
    },
    thought: {
      color: theme.colors.textSecondary,
    },
    iconColor: theme.colors.warning,
    refreshIconColor: theme.colors.textSecondary,
    footerTextColor: theme.colors.textSecondary,
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Lightbulb size={24} color={dynamicStyles.iconColor} />
        <Text style={[styles.title, dynamicStyles.title]}>
          Thought of the Day
        </Text>
        <TouchableOpacity
          onPress={handleRefresh}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <RefreshCw size={20} color={dynamicStyles.refreshIconColor} />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={[styles.thought, dynamicStyles.thought]}>
          "{thoughts[currentThoughtIndex]}"
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: dynamicStyles.footerTextColor }]}
        >
          Tap refresh for inspiration
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
  },
  thought: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
