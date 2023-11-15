import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Realm from 'realm';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { Button } from '../../components/Button';

import { Container, Slogan, Title } from './styles';

import backgroundImg from '../../assets/background.png';

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  REALM_APP_ID,
  WEB_CLIENT_ID
} from '@env';


WebBrowser.maybeCompleteAuthSession();

GoogleSignin.configure({
  // iosClientId: IOS_CLIENT_ID,
  // scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [state, setState] = useState({});

  const app = new Realm.App({
    id: REALM_APP_ID,
  });

  async function handleGoogleSignIn() {
    setIsAuthenticating(true);

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      // console.log('[USER INFO]: ', userInfo);
      // console.log('\n');
      // console.log('[USER TOKEN]: ', tokens);

      setState({ userInfo });

      if (tokens?.idToken) {
        // console.log('[USER TOKEN]: ', idToken);

        const credentials = Realm.Credentials.jwt(idToken);

        const user = await app.logIn(credentials).catch((error) => {
          console.log('[REALMDB ERROR]: ', error)
          Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google')
          setIsAuthenticating(false);
        })

        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens?.idToken}`)
          .then(response => response.json())
          .then(console.log)
      }
      else {
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google')
        setIsAuthenticating(false);
      }

    } catch (error: any) {
      console.log(error.code);
      console.log(error)

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google');
        setIsAuthenticating(false);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  useEffect(() => {

  }, [])

  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
        title="Entrar com Google"
      />
    </Container>
  );
}
