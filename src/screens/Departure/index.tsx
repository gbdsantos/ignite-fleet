import { useRef } from 'react';
import { TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content } from './styles';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log("Ok!");
  }

  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          placeholder="BRA1234"
          returnKeyType="next"
        />

        <TextAreaInput
          blurOnSubmit
          label="Finalidade"
          onSubmitEditing={handleDepartureRegister}
          placeholder="Vou utilizar o veículo para..."
          ref={descriptionRef}
          returnKeyType="send"
        />

        <Button
          onPress={handleDepartureRegister}
          title="Registrar Saída"
        />
      </Content>
    </Container>
  );
}
