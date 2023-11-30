import { LocationInfo, LocationInfoProps } from '../LocationInfo';

import { Container, Line } from './styles';
import { Car, FlagCheckered } from 'phosphor-react-native';

type Props = {
  arrival?: LocationInfoProps | null;
  departure: LocationInfoProps;
}

export function Locations({ arrival = null, departure }: Props) {
  return (
    <Container>
      <LocationInfo
        description={departure.description}
        icon={Car}
        label={departure.label}
      />

      {arrival && <>
        <Line />

        <LocationInfo
          description={arrival.description}
          icon={FlagCheckered}
          label={arrival.label}
        />
      </>
      }
    </Container>
  );
}
