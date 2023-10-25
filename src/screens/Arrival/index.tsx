import { useRoute } from '@react-navigation/native';
import { BSON } from 'realm';

import { useObject } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

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

  // const historic = useObject(Historic, new BSON.UUID(id));

  return (
    <Container>
      <Header title="Chegada" />
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
