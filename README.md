# MWShop App 🛍️

A modern e-commerce mobile application built with React Native, Expo, and TypeScript. This app provides a seamless shopping experience with product browsing, cart management, and user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Contributing](#contributing)

## ✨ Features

- 🏠 **Home Screen**: Browse products with search and pagination
- 📦 **Product Management**: View product details, categories, and pricing
- 🛒 **Shopping Cart**: Add/remove items with quantity management
- 👤 **User Profile**: User authentication and profile management
- 📧 **Mail System**: In-app messaging functionality
- 🔔 **Notifications**: Real-time notification system
- 🎨 **Modern UI**: Clean, responsive design with custom components
- ⚡ **Performance**: Optimized with debouncing, lazy loading, and pagination

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev) v54.0.25
- **Language**: TypeScript 5.9.2
- **UI Library**: React Native 0.81.5
- **Navigation**: React Navigation v7
- **HTTP Client**: Axios 1.13.2
- **State Management**: React Hooks
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons
- **Linting**: ESLint with Expo config

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── client.ts          # Axios client configuration
│   ├── endpoints.ts       # API endpoint definitions
│   └── services/          # Service modules
│       ├── productService.ts
│       └── index.ts
│
├── components/            # Reusable UI components
│   ├── common/           # Common components (Button, Card)
│   └── features/         # Feature-specific components
│       └── product/      # Product-related components
│           └── ProductCard.tsx
│
├── constants/            # App-wide constants
│   ├── api.ts           # API configuration
│   ├── colors.ts        # Color palette
│   ├── strings.ts       # String constants
│   └── index.ts
│
├── hooks/               # Custom React hooks
│   ├── useApi.ts       # API request hook
│   ├── useDebounce.ts  # Debouncing hook
│   ├── usePagination.ts # Pagination hook
│   └── index.ts
│
├── interfaces/          # TypeScript interfaces
│   ├── api.interface.ts        # API response interfaces
│   ├── category.interface.ts   # Category interfaces
│   ├── product.interface.ts    # Product interfaces
│   ├── user.interface.ts       # User & auth interfaces
│   ├── cart.interface.ts       # Cart interfaces
│   ├── order.interface.ts      # Order interfaces
│   ├── notification.interface.ts
│   └── index.ts
│
├── types/               # TypeScript types & enums
│   ├── navigation.type.ts      # Navigation types
│   ├── order.type.ts          # Order enums
│   ├── notification.type.ts   # Notification enums
│   └── index.ts
│
├── navigation/          # Navigation configuration
│   ├── AppNavigator.tsx        # Root navigator
│   ├── MainNavigator.tsx       # Main tab navigator
│   ├── navigationRef.ts        # Navigation utilities
│   └── index.ts
│
├── screens/            # Screen components
│   ├── Home/          # Home screen with product list
│   ├── Mail/          # Mail screen
│   ├── Notification/  # Notification screen
│   └── Profile/       # Profile screen
│
├── styles/            # Global styles & theme
│   ├── globalStyles.ts
│   ├── spacing.ts
│   └── theme.ts
│
├── utils/             # Utility functions
│   ├── errorHandler.ts   # Error handling
│   ├── formatters.ts     # Data formatters
│   ├── storage.ts        # AsyncStorage utilities
│   ├── validation.ts     # Validation functions
│   └── index.ts
│
└── index.ts           # Main export file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dqhuy2005/MWShop_App.git
   cd sample
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:

   ```env
   API_URL=http://your-api-url:8000/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 📜 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🏗 Architecture

### Component Structure

The app follows a modular architecture with clear separation of concerns:

- **Presentation Layer**: React Native components in `screens/` and `components/`
- **Business Logic Layer**: Custom hooks in `hooks/` for reusable logic
- **Data Layer**: API services in `api/services/` for backend communication
- **Type Safety**: Interfaces and types separated for better organization

### Key Patterns

1. **Custom Hooks**: Business logic extracted into reusable hooks

   - `useApi`: Generic API request handler with loading/error states
   - `useDebounce`: Debounce user input for search optimization
   - `usePagination`: Infinite scroll pagination management

2. **Service Layer**: API calls abstracted into service modules

   - `productService`: Product-related API operations
   - Centralized error handling and response transformation

3. **Type Safety**: Comprehensive TypeScript coverage
   - Interfaces for data models
   - Types for utility types and enums
   - Strict type checking enabled

## 🌐 API Integration

### Configuration

API client is configured in `src/api/client.ts` with:

- Base URL from environment variables
- 30-second timeout
- Automatic retry logic (3 attempts)
- Request/response interceptors for auth tokens

### Endpoints

Defined in `src/api/endpoints.ts`:

- `HOME.LIST` - Get paginated product list
- Additional endpoints for cart, orders, auth, etc.

### Pagination

Default pagination settings:

- Page size: 25 items per page
- Infinite scroll with "load more" functionality
- Debounced search with 500ms delay

## 🔄 State Management

The app uses React's built-in state management:

- **Local State**: `useState` for component-level state
- **Custom Hooks**: Shared logic and state
- **Context API**: (Future implementation for global state)
- **AsyncStorage**: Persistent local storage for user data

## 📝 Code Style

- **Linting**: ESLint with Expo configuration
- **TypeScript**: Strict mode enabled
- **Formatting**: Consistent code formatting enforced
- **File Naming**:
  - Components: PascalCase (e.g., `ProductCard.tsx`)
  - Utilities: camelCase (e.g., `formatters.ts`)
  - Interfaces: `.interface.ts` suffix
  - Types: `.type.ts` suffix

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**dqhuy2005**

- GitHub: [@dqhuy2005](https://github.com/dqhuy2005)

## 🙏 Acknowledgments

- [Expo](https://expo.dev) - React Native framework
- [React Navigation](https://reactnavigation.org) - Navigation library
- [Axios](https://axios-http.com) - HTTP client
