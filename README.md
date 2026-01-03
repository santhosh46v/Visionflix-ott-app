# Allcrea

A modern React Native video streaming application built with Expo for browsing and watching movies, videos, and TV episodes.

## Features

### 🎬 Content Browsing
- **Home Screen**: Featured content carousels, video sections, and top picks
- **Movie Screen**: Latest movies with autoplay carousel interface
- **Episode Screen**: Episode details and related content browsing
- **Real-time Updates**: Content syncs automatically from Firebase

### 📺 Video Playback
- **Full-Featured Player**: expo-video player with fullscreen and picture-in-picture support
- **Related Content**: Discover similar videos and episodes

### 🔐 User Authentication
- **Firebase Authentication**: Email/password login with persistent sessions
- **Account Menu**: Animated side menu for account management

### 🎨 User Interface
- **Modern Design**: Clean UI with smooth animations
- **Animated Components**: Spring animations, carousels, and Lottie loading states

## Tech Stack

- **React Native** (0.76.5) | **Expo** (~52.0.18) | **React** (18.3.1)
- **Redux** - State management | **React Navigation** - Navigation
- **Firebase** - Authentication & Realtime Database
- **Expo Video** - Video playback | **Styled Components** - Styling
- **Lottie** | **React Native Snap Carousel** | **React Native Reanimated** - Animations

## Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd Allcrea
   npm install
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database and Authentication (Email/Password)
   - Update Firebase configuration file with your credentials

3. **Start the app**
   ```bash
   npm start
   ```

## Usage

### Running the App
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on Web

### Using the App
1. Browse content on Home and Movie screens
2. Tap video cards to watch in the video player
3. Tap movie cards to view episode details
4. Access account settings via the menu icon

## Backend & Data

Uses **Firebase** for backend services:
- **Realtime Database**: Stores content data with real-time synchronization
- **Authentication**: Email/password login with AsyncStorage persistence
- Uses `onValue()` listeners for automatic UI updates when data changes

## Features in Detail

- **Home Screen**: Featured carousel, video section, top picks carousel
- **Movie Screen**: Interactive movie carousel with circular background design
- **Video Screen**: Video player with related content sections
- **Episode Screen**: Episode cover, latest episodes, and related content carousel
- **Menu System**: Slide-in animation with gradient background

## Animations

- **React Native Animated API**: Menu slides, login modals, overlays
- **Lottie**: Loading and success animations
- **Carousels**: Autoplay with scale, opacity, and slide effects
- **Spring Physics**: Natural animations for menus and modals

## State Management

- **Redux**: Global state for menu and authentication
- **Local State**: Component-level state for Firebase data
- Actions: `OPENMENU`, `CLOSEMENU`, `LOG`, `OPENLOGIN`, `CLOSELOGIN`

## Development

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo CLI
- Firebase project with Realtime Database and Authentication enabled

### Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
