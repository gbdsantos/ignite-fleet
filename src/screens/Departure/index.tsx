import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import {
  requestBackgroundPermissionsAsync,
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords
} from 'expo-location';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Loading } from '../../components/Loading';
import { LocationInfo } from '../../components/LocationInfo';
import { Map } from '../../components/Map';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content, Message } from './styles';
import { Car } from 'phosphor-react-native';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useRealm } from '../../libs/realm';
import { useUser } from '@realm/react';

import { getAddressLocation } from '../../utils/getAddressLocation';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { startLocationTask } from '../../tasks/backgroundLocationTask';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null);

  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  async function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.');
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo.');
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert('Localização!', 'Não foi possível obter a localização atual. Tente novamente!');
      }

      setIsRegistering(true);

      const backgroundPermission = await requestBackgroundPermissionsAsync();

      if (!backgroundPermission.granted) {
        setIsRegistering(false);
        return Alert.alert('Localização', 'É necessário permitir que o App tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".');
      }

      await startLocationTask();

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description,
          coords: [{
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
            timestamp: new Date().getTime()
          }]
        }))
      });

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
      setCurrentCoords(location.coords)

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
          {currentCoords && <Map coordinates={[currentCoords]} />}
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
