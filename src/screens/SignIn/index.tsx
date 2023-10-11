import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { Button } from '../../components/Button';

import { Container, Slogan, Title } from './styles';

import backgroundImg from '../../assets/background.png';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

GoogleSignin.configure({
  // iosClientId: IOS_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [state, setState] = useState({});

  // ⚠️ DEPRECATED CODE
  // const [_, response, googleSignIn] = Google.useAuthRequest({
  //   androidClientId: ANDROID_CLIENT_ID,
  //   iosClientId: IOS_CLIENT_ID,
  //   scopes: ['profile', 'email']
  // })

  async function handleGoogleSignIn() {
    setIsAuthenticating(true)

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();

      console.log(userInfo)
      console.log(token)
      setState({ userInfo });

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

    // ⚠️ DEPRECATED CODE
    // googleSignIn().then((response) => {
    //   if (response.type !== 'success') {
    //     setIsAuthenticating(false);
    //   }
    // })
  }

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     if (response.authentication?.idToken) {
  //       console.log('[USER TOKEN]: ', response.authentication.idToken)

  //       fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication?.idToken}`)
  //         .then(response => response.json())
  //         .then(console.log)

  //     } else {
  //       Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google')
  //       setIsAuthenticating(false);
  //     }
  //   }
  // }, [response])

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
