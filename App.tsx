import React from 'react';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';

import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { ANDROID_CLIENT_ID } from '@env';
import { REALM_APP_ID } from '@env';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent />

        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
