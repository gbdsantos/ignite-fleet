import { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content } from './styles';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log("Ok!");
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView
        behavior={keyboardAvoidingViewBehavior}
        style={{ flex: 1 }}
      >
        <ScrollView>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
