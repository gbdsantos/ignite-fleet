import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BSON } from 'realm';
import { LatLng } from 'react-native-maps';

import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import { getStorageLocation } from '../../libs/asyncStorage/locationStorage';
import { stopLocationTask } from '../../tasks/backgroundLocationTask';

import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Map } from '../../components/Map';

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer, Label,
  LicensePlate
} from './styles';
import { X } from 'phosphor-react-native';

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const route = useRoute();
  const { goBack } = useNavigation();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancelar',
      'Cancelar a utilização  do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeVehicleUsage() }
      ]
    );
  }

  async function removeVehicleUsage() {
    Realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();
    goBack();
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Error', 'Não foi possível obter os dados para registrar a chegada do veículo.');
      }

      realm.write(() => {
        historic.status = 'arrival',
          historic.updated_at = new Date();
      }
      );

      await stopLocationTask();

      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo.');
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return;
    }

    const lastSync = await getLastAsyncTimestamp();
    const updatedAt = historic!.updated_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    const locationsStorage = await getStorageLocation();
    setCoordinates(locationsStorage);
  }

  useEffect(() => {
    getLocationsInfo();
  }, [historic]);

  return (
    <Container>
      <Header title={title ? title : 'Chegada'} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Label>
          Placa do veículo
        </Label>

        <LicensePlate>
          XXX0000
          {/* { historic?.license_plate ?? 'XXX0000' } */}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          {/* { historic?.description } */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a efficitur odio, et blandit turpis. In eget condimentum nisl, at ultrices ipsum. Etiam in aliquam ante. Phasellus nec rutrum magna. Pellentesque commodo gravida vehicula. Curabitur interdum hendrerit interdum. Pellentesque sagittis ultricies arcu at porttitor. Nam a tincidunt lectus. Fusce sollicitudin eget tortor et finibus.
        </Description>
      </Content>

      {
        historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />
          <Button
            onPress={handleArrivalRegister}
            title="Registrar Chegada"
          />
        </Footer>
      }

      {
        dataNotSynced &&
        <AsyncMessage>
          Sincronização da {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </AsyncMessage>
      }
    </Container>
  );
}
