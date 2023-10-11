import { Container, Greeting, Message, Name } from './styles';

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
    </Container>
  );
}
