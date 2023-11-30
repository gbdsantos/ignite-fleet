import { LocationInfo, LocationInfoProps } from '../LocationInfo';

import { Container, Line } from './styles';
import { Car, FlagCheckered } from 'phosphor-react-native';

type Props = {
  arrival: LocationInfoProps;
  departure: LocationInfoProps;
}

export function Locations({ arrival, departure }: Props) {
  return (
    <Container>
      <LocationInfo
        description={departure.description}
        icon={Car}
        label={departure.label}
      />

      <Line />

      <LocationInfo
        description={arrival.description}
        icon={FlagCheckered}
        label={arrival.label}
      />
    </Container>
  );
}
