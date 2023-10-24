import { useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';

import { X } from 'phosphor-react-native';

import {
  Container,
  Content,
  Description,
  Footer, Label,
  LicensePlate
} from './styles';

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>
          Placa do veículo
        </Label>

        <LicensePlate>
          XXX0000
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a efficitur odio, et blandit turpis. In eget condimentum nisl, at ultrices ipsum. Etiam in aliquam ante. Phasellus nec rutrum magna. Pellentesque commodo gravida vehicula. Curabitur interdum hendrerit interdum. Pellentesque sagittis ultricies arcu at porttitor. Nam a tincidunt lectus. Fusce sollicitudin eget tortor et finibus.
        </Description>

        <Footer>
          <ButtonIcon
            icon={X}
          />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
