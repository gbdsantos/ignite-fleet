import 'react-native-get-random-values';
import './src/libs/dayjs';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';
import { WifiSlash } from 'phosphor-react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { SignIn } from './src/screens/SignIn';
import { TopMessage } from './src/components/TopMessage';

import { RealmProvider, syncConfig } from './src/libs/realm';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { REALM_APP_ID } from '@env';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold
  });

  const netInfo = useNetInfo();

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
          {
            !netInfo.isConnected &&
            <TopMessage
              icon={WifiSlash}
              title="Você está off-line."
            />
          }

          <UserProvider fallback={SignIn}>
            <RealmProvider fallback={Loading} sync={syncConfig}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
