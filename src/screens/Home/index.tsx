import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useQuery, useRealm } from '../../libs/realm';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from './styles';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const { navigate } = useNavigation();

  // const historic = useQuery(Historic);
  // const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse?._id.toString() });
    } else {
      navigate('departure');
    }
  }

  // function fetchVehicleInUse() {
  //   try {
  //     const vehicle = historic.filtered('status = "departure"')[0];
  //     setVehicleInUse(vehicle);
  //   } catch (error) {
  //     Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   realm.addListener('change', () => fetchVehicleInUse());

  //   return () => realm.removeListener('change', fetchVehicleInUse);
  // }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate="BRA1234"
          onPress={() => navigate('arrival', { id: 'someUUIDhere' })}
        />
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
