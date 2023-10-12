import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser, useApp } from '@realm/react';

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
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container style={{ paddingTop }}>
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

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <Power color={theme.COLORS.GRAY_400} size={32} />
      </TouchableOpacity>
    </Container>
  );
}
