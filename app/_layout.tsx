import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import HomeScreen from "./pages/HomeScreen";
import TodoScreen from "./pages/TodoScreen";

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
          }}
        />
        <Tab.Screen
          name="Todo"
          component={TodoScreen}
          options={{
            tabBarLabel: "Todo List",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
