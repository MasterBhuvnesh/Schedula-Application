<div align="center">
<img src="https://img.shields.io/badge/-Supabase-000000?style=for-the-badge&logo=supabase&logoColor=3dc48f" alt="Supabase" />
<img src="https://img.shields.io/badge/-TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=blue" alt="TypeScript" />
<img src="https://img.shields.io/badge/-Expo-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
<img src="https://img.shields.io/badge/-ESLint-000000?style=for-the-badge&logo=eslint&logoColor=4B32C3" alt="ESLint" />
<img src="https://img.shields.io/badge/-Clerk-000000?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
<img src="https://img.shields.io/badge/-Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
<img src="https://img.shields.io/badge/-Node.js-000000?style=for-the-badge&logo=node.js&logoColor=3C873A" alt="Node.js" />
<img src="https://img.shields.io/badge/-Render-000000?style=for-the-badge&logo=render&logoColor=46E3B7" alt="Render" />

</div>

# Schedula

A modern event management and ticketing mobile application built with Expo and React Native. Schedula provides a complete solution for event discovery, registration, digital ticketing, and QR code-based check-ins.

## 🚀 Core Features

### 📅 Event Management

- **Event Discovery**: Browse upcoming and past events with animated cards
- **Event Details**: Comprehensive event information with images, dates, locations, and pricing
- **Event Registration**: One-tap registration for events with real-time status updates
- **Sponsored Events**: Featured event highlighting with special card design
- **Event Status Tracking**: Dynamic status indicators (Open/Closed registration, Upcoming/Past events)
- **Event Filtering**: Automatic sorting by status, registration status, and start time

### 🎫 Digital Ticketing System

- **Automatic Ticket Generation**: QR code tickets generated upon registration
- **Ticket Storage**: Secure storage in Supabase with user-specific organization
- **Digital Ticket Viewer**: Horizontal scrolling ticket carousel with event details
- **QR Code Integration**: Each ticket contains registration ID and verification code
- **Ticket Validation**: Real-time ticket verification system

### 📱 QR Code Scanning & Check-in

- **Camera Integration**: Native camera access for QR code scanning
- **Admin Check-in**: Role-based access for event administrators
- **Real-time Validation**: Instant verification of registration codes
- **Check-in Status**: Prevents duplicate check-ins with status tracking
- **Scan History**: Maintains record of check-in timestamps and admin actions

### 👤 User Management & Profiles

- **Authentication**: Secure Google OAuth integration via Clerk
- **Profile Management**: Editable user profiles with image upload
- **Role-Based Access**: Admin and regular user roles with different permissions
- **Profile Image Upload**: Image picker integration with base64 encoding
- **User Data Persistence**: Automatic user data syncing with Supabase

### 🔐 Permissions & Security

- **Camera Permissions**: Managed camera access for QR scanning
- **Media Library Access**: Controlled access for image saving and uploads
- **Permission Cards**: User-friendly permission request interface
- **Secure Storage**: Encrypted token storage via Clerk

## 📱 Screens & Navigation

### 🏠 Main App Screens

- **Home Screen**: Event feed with sponsored content and infinite scroll
- **Ticket Screen**: Personal ticket gallery with horizontal carousel
- **Profile Screen**: User profile with settings and permissions
- **Event Details**: Full event information with registration functionality

### 🔧 Utility Screens

- **Authentication Screen**: Animated welcome screen with Google sign-in
- **Profile Editor**: Complete profile editing interface
- **QR Scanner**: Full-screen camera interface for check-ins
- **Permission Manager**: System permissions handling interface

## 🎨 UI Components & Design System

### 📋 Event Components

- **EventCard**: Animated event cards with status indicators
- **EventDetailsCard**: Comprehensive event information display
- **SponsorCard**: Featured event card with special styling

### 👥 User Components

- **ProfileCard**: User information display with edit functionality
- **ProfileEditImage**: Image upload component with loading states
- **EditProfileFormSection**: Form inputs for profile editing
- **UpdateButton**: Action button with loading and disabled states

### 🔧 Utility Components

- **PermissionCard**: Individual permission request cards
- **PermissionsSection**: Complete permissions management interface
- **CustomNavBar**: Bottom tab navigation with custom styling
- **BackgroundCard**: Theme selection and background management

### 🎭 Core UI Elements

- **CustomText**: Typography system with font weight variants
- **AppIcon**: Consistent icon system using Lucide React Native
- **CustomLoader**: Loading states with animations
- **CustomError**: Error handling and display components
- **AlertModal**: Modal dialogs for confirmations and alerts
- **Glassmorphism**: Glass-effect background components

## 🔧 Technical Implementation

### 🏗️ Architecture

- **File-based Routing**: Expo Router for navigation
- **Component Architecture**: Modular, reusable component system
- **State Management**: React hooks and context for local state
- **Type Safety**: Comprehensive TypeScript implementation
- **Custom Hooks**: Reusable logic for data fetching and UI management

### 📊 Data Management

- **Supabase Integration**: Real-time database operations
- **File Storage**: QR code and image storage in Supabase buckets
- **Data Hooks**: Custom hooks for events, users, tickets, and permissions
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading experiences throughout the app

### 🎨 Theming System

Schedula features a complete theming system with multiple color schemes:

- **Emerald** (Default green theme)
- **Amber** (Warm yellow/orange theme)
- **Sky** (Cool blue theme)
- **Rose** (Pink/red theme)
- **Dynamic Theme Switching**: Runtime theme changes with persistence
- **Background Management**: Animated background components

### 📱 Mobile-First Features

- **Responsive Design**: Adaptive layouts for different screen sizes
- **Native Animations**: Smooth transitions using React Native Reanimated
- **Haptic Feedback**: Touch feedback integration
- **Status Bar Management**: Dynamic status bar styling
- **Navigation Bar Control**: Hidden navigation bars for immersive experience

## 🏢 Production Architecture & DevOps

### 🖥️ Backend Infrastructure

- **Custom QR Generation Server**: Dedicated Node.js TypeScript server hosted on Render for QR code generation and storage
  - Repository: [Schedula-Server](https://github.com/MasterBhuvnesh/Schedula-Server)
  - **JWT Authentication**: Secure data transmission between client and server
  - **Service Availability**: Automated cron jobs every 14 minutes to prevent service hibernation
  - **Scalable Architecture**: Handles QR generation workload separately from main Supabase backend

### 🔄 Automated Maintenance & Optimization

- **Database Health Monitoring**: Automated cron jobs run daily at midnight to perform health checks on Supabase, preventing project hibernation
- **Storage Optimization**: Intelligent QR code lifecycle management
  - Automatic deletion of QR codes when events close to optimize storage costs
  - Persistent registration records maintained in database for audit trails
  - Efficient storage utilization without compromising data integrity

### 🚀 Continuous Integration & Deployment

- **EAS CLI Integration**: Expo Application Services configured for streamlined builds and deployments
- **GitHub CI/CD Pipeline**: Automated deployment workflow
  - Continuous integration with automated testing
  - Automatic application updates pushed to users without requiring manual downloads
  - Version control integration for seamless development workflow

### 🎨 Enhanced Event Features

- **Custom Sponsored Event Cards**: Specialized UI components for featured events with enhanced visual design and priority placement
- **Dynamic Event Status Management**: Real-time event lifecycle handling with automated transitions

## 🛠️ Technology Stack

- **[Expo](https://expo.dev/)** - React Native framework with native modules
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing system
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Supabase](https://supabase.com/)** - Backend database, storage, and real-time features
- **[Custom Node.js Server](https://github.com/MasterBhuvnesh/Schedula-Server)** - QR generation and storage service
- **[Render](https://render.com/)** - Cloud hosting for backend services
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - High-performance animations
- **[Lucide React Native](https://lucide.dev/)** - Beautiful, customizable icons
- **[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)** - Camera functionality for QR scanning
- **[EAS CLI](https://docs.expo.dev/eas/)** - Build and deployment tools
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline automation

## 📋 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator (optional for mobile testing)
- Supabase account and project
- Clerk account and application

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MasterBhuvnesh/Schedula-Application.git
   cd Schedula-Application
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. Configure Supabase:

   - Set up your database tables for events, event_registrations, and users
   - Configure storage buckets for QR codes and images
   - Set up RLS (Row Level Security) policies

5. Configure Clerk:

   - Set up OAuth providers (Google)
   - Configure user management settings
   - Set up webhooks if needed

6. Start the development server:
   ```bash
   npx expo start
   ```

## 💻 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android device/emulator
- `npm run ios` - Start the app on iOS device/simulator
- `npm run web` - Start the app in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

## 📁 Project Structure

```
schedula/
├── assets/                        # Static assets (images, fonts, icons)
├── src/                           # Source code
│   ├── app/                       # Expo Router pages and layouts
│   │   ├── index.tsx              # Landing/Auth screen
│   │   ├── edit.tsx               # Profile editing screen
│   │   ├── (main)/                # Main app tabs
│   │   │   ├── home.tsx           # Events feed
│   │   │   ├── ticket.tsx         # User tickets
│   │   │   └── profile.tsx        # User profile
│   │   ├── event/                 # Event detail pages
│   │   └── scan/                  # QR scanning functionality
│   ├── components/                # Reusable UI components
│   │   ├── global/                # Core components (Text, Loader, etc.)
│   │   ├── auth/                  # Authentication components
│   │   ├── sso/                   # Single sign-on components
│   │   └── ui/                    # Feature-specific UI components
│   ├── hooks/                     # Custom React hooks
│   │   ├── ui/                    # UI-related hooks
│   │   ├── useEvents.ts           # Event data management
│   │   ├── useUser.ts             # User data management
│   │   └── useTicketsFiles.ts     # Ticket management
│   ├── lib/                       # Core business logic
│   │   ├── supabase.ts            # Supabase client configuration
│   │   ├── event.register.ts      # Event registration logic
│   │   ├── checkin.qr.scan.ts     # QR check-in functionality
│   │   └── generate.ticket.qr.ts  # Ticket generation
│   ├── types/                     # TypeScript type definitions
│   │   ├── data/                  # Data model types
│   │   ├── qr.type.ts             # QR code related types
│   │   └── toast.type.ts          # Toast notification types
│   ├── context/                   # React context providers
│   ├── providers/                 # App-wide providers
│   ├── constants/                 # App constants and configurations
│   ├── logger/                    # Logging utilities
│   └── utils/                     # Helper functions and utilities
├── .env                           # Environment variables (not in repo)
├── app.json                       # Expo configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

```

## 🔒 Environment Variables

Required environment variables for the application:

- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

## 🚀 Deployment

### Mobile App Deployment

The app can be deployed using Expo Application Services (EAS):

1. Install EAS CLI: `npm install -g eas-cli`
2. Configure EAS: `eas build:configure`
3. Build for production: `eas build --platform all`
4. Submit to app stores: `eas submit`

### Backend Services

- **QR Generation Server**: Deployed on Render with automatic scaling
- **Database**: Supabase managed PostgreSQL with automated backups
- **Storage**: Supabase buckets with CDN distribution
- **Monitoring**: Automated health checks and service monitoring

### CI/CD Pipeline

The project includes a complete CI/CD setup:

- Automated testing on pull requests
- Automatic builds triggered by main branch commits
- Over-the-air updates delivered to users seamlessly
- Zero-downtime deployments with rollback capabilities

## 🔄 Database Schema

### Events Table

- Event information (title, description, location, dates)
- Registration status and pricing
- Banner images and metadata

### Event Registrations Table

- User registrations for events
- QR codes and verification data
- Check-in status and timestamps

### Users Table (via Clerk webhook)

- User profiles and roles
- Authentication metadata

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Add TypeScript types for new features
- Include proper error handling
- Test on both iOS and Android platforms
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Bhuvnesh Verma - [bhuvneshverma2904@gmail.com](mailto:bhuvneshverma2904@gmail.com)

Project Link: [https://github.com/MasterBhuvnesh/Schedula-Application](https://github.com/MasterBhuvnesh/Schedula-Application)

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing development platform
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Clerk](https://clerk.com/) for authentication services
- [Lucide](https://lucide.dev/) for the beautiful icon library
```
