import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { Button } from '../../components/Button'

import { Container, Header, SubTitle, Title, Footer } from './styles'

export function SignIn() {
  const theme = useTheme()
  return (
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

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          isLoading={false}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          color={theme.colors.background_secondary}
          enabled={true}
          isLoading={false}
          light={true}
        />
      </Footer>
    </Container>
  )
}
