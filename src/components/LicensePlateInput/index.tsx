import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';
import { Container, Input, Label } from './styles';

type Props = TextInputProps & {
  label: string;
}

const LicensePlateInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        autoCapitalize="characters"
        maxLength={7}
        placeholderTextColor={COLORS.GRAY_400}
        ref={ref}
        {...rest}
      />
    </Container>
  );
});

export { LicensePlateInput };
