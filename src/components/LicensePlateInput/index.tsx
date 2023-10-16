import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';
import { Container, Input, Label } from './styles';

type Props = TextInputProps & {
  label: string;
}

export function LicensePlateInput({ label, ...rest }: Props) {
  const COLORS = useTheme();

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        autoCapitalize="characters"
        maxLength={7}
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
}
