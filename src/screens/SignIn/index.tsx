import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'

import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { PasswordInput } from '../../components/PasswordInput'
import { Container, Header, SubTitle, Title, Form, Footer } from './styles'
import { useAuth } from '../../hooks/auth'
import { database } from '../../database'

export function SignIn() {
  const theme = useTheme()
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória')
      })
      await schema.validate({ email, password })

      signIn({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle="dark-content"
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              value={email}
              onChangeText={setEmail}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={!!email || !!password}
              isLoading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={() => navigation.navigate('FirstStep')}
              color={theme.colors.background_secondary}
              isLoading={false}
              light={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
