import { TouchableOpacity } from 'react-native';
import { useUser } from '@realm/react';

import {
  Container,
  Greeting,
  Message,
  Name,
  Picture
} from './styles';
import { Power } from 'phosphor-react-native';
import theme from '../../theme';

export function HomeHeader() {
  const user = useUser();

  return (
    <Container>
      <Picture
        placeholder="L184i9offQof00ayfQay~qj[fQj["
        source={{ uri: user?.profile.pictureUrl }}
      />
      <Greeting>
        <Message>
          Olá
        </Message>

        <Name>
          {user.profile.name}
        </Name>
      </Greeting>

      <TouchableOpacity>
        <Power color={theme.COLORS.GRAY_400} size={32} />
      </TouchableOpacity>
    </Container>
  );
}
