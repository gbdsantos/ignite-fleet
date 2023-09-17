import React from 'react';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { SignIn } from './src/screens/SignIn';

import { Loading } from './src/components/Loading';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

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
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent />

      <SignIn />
    </ThemeProvider>
  );
}