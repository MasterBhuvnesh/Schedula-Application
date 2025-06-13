> **Note:** This Supabase Test is for educational purposes.

# Quotes List

A simple implementation using **Expo**, **Supabase**, and **Reanimated** to display a paginated, animated list of quotes.

---

## ✨ Features

- **Quotes List:** Fetch and display quotes from a Supabase database.
- **Pagination:** Infinite scroll loads more quotes as you reach the end.
- **Pull-to-Refresh:** Refresh the list with a swipe gesture.
- **Animated List Items:** Smooth animations using `react-native-reanimated`.
- **Blurred Background:** Visually appealing blurred image background.

---

## 🧩 Main Components

### 1. `App` Component

- Sets up the UI with a blurred background image.
- Uses a `FlatList` to render quotes.
- Handles refreshing and loading more data.
- Integrates with the custom `useQuotesData` hook for data fetching.

### 2. `useQuotesData` Hook

- Fetches quotes from Supabase with pagination.
- Manages loading, error, and pagination state.
- Exposes methods for refreshing and loading more data.

### 3. `ListItem` Component

- Renders each quote with its theme.
- Animates appearance based on visibility using Reanimated.

---

## ⚙️ How It Works

1. On mount, the app fetches the first page of quotes.
2. As the user scrolls, more quotes are loaded automatically.
3. Pull-to-refresh reloads the first page.
4. Each quote animates in/out as it becomes visible/invisible.

---

## 🛠️ Technologies Used

- **React Native & Expo:** For building the mobile app.
- **Supabase:** Backend database for storing quotes.
- **react-native-reanimated:** For smooth item animations.
- **expo-image:** For optimized image rendering.

---

This setup provides a modern, performant, and visually appealing way to browse quotes from a remote database.

> **Important:** Run `setup.sql` before `seed.sql` to ensure your Supabase database is properly configured.  
> **Tip:** Use the provided `seed.sql` file to generate sample quote data in your Supabase database for testing and development.
