import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from './styles';

export function Home() {

  const { navigate } = useNavigation();

  function handleRegisterMoviment() {
    navigate('departure');
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus licensePlate="XXX-1234" />
        <CarStatus licensePlate="XXX-1234" onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
