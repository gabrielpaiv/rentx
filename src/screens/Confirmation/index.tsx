import React from 'react'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { Container, Content, Title, Message, Footer } from './styles'
import { StatusBar, useWindowDimensions } from 'react-native'
import { ConfirmButton } from '../../components/ConfirmButton'
import { useNavigation, useRoute } from '@react-navigation/native'

interface Params {
  title: string
  message: string
  nextScreenRoute: any
}

export function Confirmation() {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  const { title, message, nextScreenRoute } = useRoute().params as Params

  function handleOk() {
    navigation.navigate(nextScreenRoute)
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleOk} />
      </Footer>
    </Container>
  )
}
