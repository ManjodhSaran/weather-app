# Weather App - React Native Technical Challenge

A beautiful and feature-rich weather application built with React Native and Expo, showcasing MVVM architecture, offline caching, and modern UI/UX design.

## 🌟 Features

### Core Functionality

- **City-based Weather Search**: Search for weather data by city name with intelligent debouncing
- **Comprehensive Weather Data**: Temperature, humidity, wind speed, pressure, visibility, UV index, and more
- **Offline Caching**: Last searched weather data available without internet connection
- **MVVM Architecture**: Clean separation of concerns with Models, ViewModels, and Views
- **Pull-to-Refresh**: Refresh weather data with intuitive pull gesture

### Enhanced User Experience

- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Smooth Animations**: Powered by React Native Reanimated for buttery performance
- **Responsive Design**: Optimized for all device sizes and orientations
- **Error Handling**: Comprehensive error states with retry functionality
- **Performance Optimized**: Debounced search, minimal re-renders, and efficient caching

### Technical Excellence

- **TypeScript**: Full type safety throughout the application
- **Expo Router**: File-based routing with tab navigation
- **AsyncStorage**: Persistent data storage for offline functionality
- **VisualCrossing API**: Reliable weather data source
- **Clean Code**: Well-structured, maintainable, and documented codebase

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ManjodhSaran/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Key**

   Get your free API key from [VisualCrossing Weather API](https://www.visualcrossing.com/weather-api):

   - Sign up for a free account
   - Copy your API key
   - Open `services/weatherApi.ts`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

   ```typescript
   const API_KEY = '8ZETXXRC55JUCBVBSRAXPNL7K';
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Run on your device**

   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press `i` for iOS Simulator, `a` for Android Emulator

## 📱 How to Use

### Basic Usage

1. **Search for Weather**: Type a city name in the search input
2. **View Details**: See comprehensive weather information including temperature, humidity, wind speed, and more
3. **Refresh Data**: Pull down on the weather card to refresh data
4. **Offline Access**: Previously searched weather data is available without internet

### Settings

1. **Toggle Theme**: Go to Settings tab to switch between dark and light modes
2. **Clear Cache**: Remove all stored weather data from the Settings tab
3. **About**: View app information and features

## 🏗️ Architecture

### MVVM Pattern Implementation

#### **Model Layer** (`/models`, `/services`)

- **Weather.ts**: Data models and TypeScript interfaces
- **weatherApi.ts**: API service for fetching weather data
- **storage.ts**: AsyncStorage service for offline caching

#### **ViewModel Layer** (`/hooks`)

- **useWeather.tsx**: Main weather state management and business logic
- **useTheme.tsx**: Theme state management and persistence
- **useFrameworkReady.ts**: Framework initialization hook

#### **View Layer** (`/app`, `/components`)

- **Screens**: Tab-based navigation with weather and settings screens
- **Components**: Reusable UI components (WeatherCard, SearchInput, etc.)

### File Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation layout
│   │   ├── index.tsx        # Weather search screen
│   │   └── settings.tsx     # Settings screen
│   └── _layout.tsx          # Root layout
├── components/
│   ├── WeatherCard.tsx      # Main weather display component
│   ├── SearchInput.tsx      # Debounced search input
│   ├── LoadingSpinner.tsx   # Animated loading indicator
│   └── ErrorMessage.tsx     # Error display with retry
├── hooks/
│   ├── useWeather.tsx       # Weather ViewModel
│   ├── useTheme.tsx         # Theme ViewModel
│   └── useFrameworkReady.ts # Framework initialization
├── models/
│   └── Weather.ts           # Weather data models
├── services/
│   ├── weatherApi.ts        # API service
│   └── storage.ts           # Storage service
└── README.md
```

## 🔧 Technical Implementation

### API Integration

- **Service**: VisualCrossing Weather API
- **Method**: RESTful HTTP requests using Fetch API
- **Error Handling**: Comprehensive error states for network, API, and validation errors
- **Rate Limiting**: Debounced search to minimize API calls

### Offline Caching Strategy

- **Storage**: AsyncStorage for persistent data
- **Cache Duration**: 1 hour expiry for weather data
- **Fallback**: Cached data shown when network is unavailable
- **Cache Management**: Clear cache functionality in settings

### Performance Optimizations

- **Debouncing**: 500ms delay for search input to reduce API calls
- **Lazy Loading**: Components rendered only when needed
- **Minimal Re-renders**: Optimized state management with useCallback and useMemo
- **Efficient Navigation**: File-based routing with Expo Router

### State Management

- **Custom Hooks**: Following MVVM pattern for business logic
- **Context API**: Theme management across the app
- **Local State**: Component-specific state for UI interactions
- **Persistent State**: AsyncStorage for user preferences and cache

## 🎨 Design System

### Color Palette

- **Light Theme**: Clean whites and subtle grays with blue accents
- **Dark Theme**: Rich dark blues and light text for excellent contrast
- **Semantic Colors**: Success (green), Warning (amber), Error (red), Info (cyan)

### Typography

- **Primary**: System font with carefully chosen weights
- **Hierarchy**: Clear size and weight distinctions for readability
- **Spacing**: Consistent 8px grid system throughout

### Components

- **Weather Cards**: Elevated design with subtle shadows
- **Interactive Elements**: Clear focus states and touch feedback
- **Icons**: Lucide React Native for consistent iconography
- **Animations**: Smooth transitions using React Native Reanimated

## 🧪 Testing the App

### Manual Testing Checklist

#### Core Functionality

- [ ] Search for a valid city (e.g., "London", "New York")
- [ ] Search for an invalid city (should show error)
- [ ] Test without internet connection (should show cached data)
- [ ] Pull-to-refresh functionality
- [ ] Navigation between tabs

#### Theme and Settings

- [ ] Toggle between dark and light themes
- [ ] Theme persistence after app restart
- [ ] Clear cache functionality
- [ ] About dialog

#### Error Handling

- [ ] Invalid city name
- [ ] Network error
- [ ] API rate limiting
- [ ] Empty search input

### Performance Testing

- [ ] Smooth animations and transitions
- [ ] Quick search response (debouncing working)
- [ ] App startup time
- [ ] Memory usage during extended use

## 🚀 Deployment

### Expo Deployment

1. **Build for Expo Go**

   ```bash
   npm run build:web
   ```

2. **Create Production Build**

   ```bash
   expo build:android
   expo build:ios
   ```

3. **Publish to Expo**

   ```bash
   expo publish
   ```

### Development Build (Recommended for Production)

```bash
expo install expo-dev-client
expo run:android
expo run:ios
```

## 📋 Development Notes

### Environment Setup

- **Platform**: Web-first development with mobile compatibility
- **Framework**: Expo SDK 53 with Expo Router 5
- **TypeScript**: Strict mode enabled for type safety
- **Styling**: StyleSheet.create with theme system
