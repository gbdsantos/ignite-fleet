import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useQuery } from '../../libs/realm';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from './styles';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const { navigate } = useNavigation();

  // const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate('departure');
  }

  function fetchVehicle() {
    try {
      const vehicle = historic.filtered('status = "departure"')[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
      console.log(error);
    }
  }

  // useEffect(() => {
  //   fetchVehicle();
  // }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus />
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
