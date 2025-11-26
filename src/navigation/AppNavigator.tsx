
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import MainNavigator from './MainNavigator';
import navigationRef from './navigationRef';

SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
