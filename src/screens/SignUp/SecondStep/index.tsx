import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'
import { api } from '../../../services/api'

interface Params {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SecondStep() {
  const theme = useTheme()
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { user } = useRoute().params as Params

  async function handleRegister() {
    setIsLoading(true)
    if (!password || !passwordConfirmation) {
      setIsLoading(false)
      return Alert.alert('Opa', 'Informe e confirme a senha!')
    }

    if (password != passwordConfirmation) {
      setIsLoading(false)
      return Alert.alert('Eita', 'As senhas não são iguais')
    }

    await api
      .post('users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar.`,
          nextScreenRoute: 'SignIn'
        })
      )
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        Alert.alert('Ops', 'Ocorreu um erro ao tentar cadastrar')
      })
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma fácil e rápida
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
            isLoading={isLoading}
            enabled={!isLoading}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
