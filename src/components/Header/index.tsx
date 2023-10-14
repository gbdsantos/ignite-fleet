import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeft } from 'phosphor-react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const { goBack } = useNavigation();

  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 42;

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
      >
        <ArrowLeft
          color={COLORS.BRAND_LIGHT}
          size={24}
          weight="bold"
        />
      </TouchableOpacity>

      <Title>
        {title}
      </Title>
    </Container>
  );
}
