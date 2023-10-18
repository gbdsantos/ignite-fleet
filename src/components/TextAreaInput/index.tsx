import { TextInput, TextInputProps } from 'react-native';

import { Container, Input, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        autoCapitalize="sentences"
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        ref={ref}
        {...rest}
      />
    </Container>
  );
});

export { TextAreaInput };
