import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.iconContainer}>
        <AlertCircle size={48} color={theme.colors.error} strokeWidth={2} />
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Oops! Something went wrong
      </Text>
      
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
      
      {onRetry && (
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={onRetry}
        >
          <RefreshCw size={16} color="white" strokeWidth={2} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});