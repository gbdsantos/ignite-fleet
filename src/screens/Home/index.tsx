import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from './styles';

export function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMovement() {
    navigate('departure');
  }

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
