import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription
} from 'expo-location';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Loading } from '../../components/Loading';
import { LocationInfo } from '../../components/LocationInfo';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content, Message } from './styles';
import { Car } from 'phosphor-react-native';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useRealm } from '../../libs/realm';
import { useUser } from '@realm/react';

import { getAddressLocation } from '../../utils/getAddressLocation';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const { goBack } = useNavigation();
  // const realm = useRealm();
  // const user = useUser();

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.');
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo.');
      }

      setIsRegistering(true);

      // realm.write(() => {
      //   Realm.create('Historic', Historic.generate({
      //     user_id: user!.id,
      //     license_plate: licensePlate.toUpperCase(),
      //     description
      //   }))
      // });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');
      goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.');
      setIsRegistering(false);
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      getAddressLocation(location.coords)
        .then((address) => {
          if (address) {
            setCurrentAddress(address);
          }
        })
        .finally(() => setIsLoadingLocation(false))
    }).then((response) => subscription = response);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission]);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade.
          Por favor, acesse as configurações do seu dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            {
              currentAddress &&
              <LocationInfo
                icon={Car}
                label='Localização atual'
                description={currentAddress}
              />
            }

            <LicensePlateInput
              label="Placa do veículo"
              onChangeText={setLicensePlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              placeholder="BRA1234"
              ref={licensePlateRef}
              returnKeyType="next"
            />

            <TextAreaInput
              blurOnSubmit
              label="Finalidade"
              onChangeText={setDescription}
              onSubmitEditing={handleDepartureRegister}
              placeholder="Vou utilizar o veículo para..."
              ref={descriptionRef}
              returnKeyType="send"
            />

            <Button
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
              title="Registrar Saída"
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
