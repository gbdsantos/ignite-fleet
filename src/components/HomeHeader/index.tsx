import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name } from './styles';

import { Power } from 'phosphor-react-native';
import theme from '../../theme';

export function HomeHeader() {
  return (
    <Container>
      <Greeting>
        <Message>
          Olá
        </Message>

        <Name>
          Guilherme
        </Name>
      </Greeting>

      <TouchableOpacity>
        <Power color={theme.COLORS.GRAY_400} size={32} />
      </TouchableOpacity>
    </Container>
  );
}
