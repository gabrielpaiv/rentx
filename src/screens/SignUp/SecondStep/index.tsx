import React from 'react'
import { Keyboard, KeyboardAvoidingView } from 'react-native'
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

export function SecondStep() {
  const theme = useTheme()
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
            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir Senha" />
          </Form>
          <Button title="Cadastrar" color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
