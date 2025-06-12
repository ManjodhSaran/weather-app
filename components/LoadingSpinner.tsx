import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export function LoadingSpinner() {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }),
      -1,
      false
    );
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.spinner,
          { borderTopColor: theme.colors.primary },
          animatedStyle
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
  },
});