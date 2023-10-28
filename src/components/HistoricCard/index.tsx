import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Departure, Info, LicensePlate } from './styles';
import { Check, Clock, ClockClockwise } from 'phosphor-react-native';

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps;
}

export function HistoricCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>
          {data.licensePlate ? data.licensePlate : 'BRA0000'}
        </LicensePlate>

        <Departure>
          {data.created ? data.created : 'xx/xx'}
        </Departure>
      </Info>

      {
        data.isSync ?
          <Check
            color={COLORS.BRAND_LIGHT}
            size={24}
          />
          :
          <ClockClockwise
            color={COLORS.GRAY_400}
            size={24}
          />
      }
    </Container>
  );
}
