import { IconProps } from 'phosphor-react-native';
import { Container, Title } from './styles';

import { useTheme } from 'styled-components';

import { IconBoxProps } from '../ButtonIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  icon?: IconBoxProps;
  title: string;
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;

  return (
    <Container style={{ paddingTop }}>
      {
        Icon &&
        <Icon
          color={COLORS.GRAY_100}
          size={18}
        />
      }
      <Title>
        {title}
      </Title>
    </Container>
  );
}
