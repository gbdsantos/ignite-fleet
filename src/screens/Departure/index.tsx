import { useRef, useState } from 'react';
import {
  Alert,
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
import { licensePlateValidate } from '../../utils/licensePlateValidate';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();

      return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.');
    }
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
              onChangeText={setLicensePlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              placeholder="BRA1234"
              ref={licensePlateRef}
              returnKeyType="next"
            />

            <TextAreaInput
              blurOnSubmit
              label="Finalidade"
              onChangeText={setDescription}
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
