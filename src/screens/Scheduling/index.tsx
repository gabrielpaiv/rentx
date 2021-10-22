import React from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'

import {
  Header,
  Container,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'

import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'
import { useNavigation } from '@react-navigation/native'

export function Scheduling() {
  const theme = useTheme()

  const navigation = useNavigation()

  function handleSchedule() {
    navigation.navigate('SchedulingDetails')
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>21/10/2021</DateValue>
          </DateInfo>

          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>21/10/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleSchedule} />
      </Footer>
    </Container>
  )
}
