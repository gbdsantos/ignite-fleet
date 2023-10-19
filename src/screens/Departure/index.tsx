import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content } from './styles';

import { Historic } from '../../libs/realm/schemas/Historic';
import { useRealm } from '../../libs/realm';
import { useUser } from '@realm/react';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { goBack } = useNavigation();
  // const realm = useRealm();
  // const user = useUser();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.');
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo.');
      }

      setIsRegistering(true);

      // realm.write(() => {
      //   Realm.create('Historic', Historic.generate({
      //     user_id: user!.id,
      //     license_plate: licensePlate.toUpperCase(),
      //     description
      //   }))
      // });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');
      goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.');
      setIsRegistering(false);
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
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
              title="Registrar Saída"
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
