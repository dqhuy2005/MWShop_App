import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import HomeScreen from "./pages/HomeScreen";
import MailScreen from "./pages/MailScreen";
import NotificationScreen from "./pages/NotificationScreen";
import ProfileScreen from "./pages/ProfileScreen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name="Mail"
          component={MailScreen}
          options={{
            tabBarLabel: "Mail",
            tabBarIcon: () => (
              <Ionicons name="mail" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: () => (
              <Ionicons name="notifications" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <Ionicons name="person" size={24} color="black" />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
