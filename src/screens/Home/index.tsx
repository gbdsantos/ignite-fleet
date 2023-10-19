import { useNavigation } from '@react-navigation/native';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useQuery } from '../../libs/realm';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from './styles';
import { useEffect } from 'react';

export function Home() {
  const { navigate } = useNavigation();

  // const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate('departure');
  }

  // function fetchVehicle() {
  //   console.log(historic)
  // }

  // useEffect(() => {
  //   fetchVehicle();
  // }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus />
        <CarStatus licensePlate="XXX-1234" onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}
