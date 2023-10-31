import 'react-native-get-random-values';
import './src/libs/dayjs';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn';
import { Routes } from './src/routes';

import { RealmProvider, syncConfig } from './src/libs/realm';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

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
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent
          />
          {/* <UserProvider fallback={Home}> */}
          {/* <RealmProvider fallback={Loading} sync={syncConfig}> */}
          <Routes />
          {/* </RealmProvider> */}
          {/* </UserProvider> */}
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
