import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Calendar,
  Day,
  generateInterval,
  MarkedDate
} from '../../components/Calendar'

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
import { BackButton } from '../../components/BackButton'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { Params } from '../CarDetails'

type RentalPeriod = {
  start: number
  startFormatted: string
  end: number
  endFormatted: string
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<Day>({} as Day)
  const [markedDates, setMarkedDates] = useState<MarkedDate>({} as MarkedDate)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )
  const theme = useTheme()

  const navigation = useNavigation()

  const route = useRoute()
  const { car } = route.params as Params

  function handleSchedule() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleChangeDate(date: Day) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      let temp = start
      start = end
      end = temp
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(start.timestamp)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(
        getPlatformDate(new Date(end.timestamp)),
        'dd/MM/yyyy'
      )
    })
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
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedule}
          enabled={!!rentalPeriod.start}
        />
      </Footer>
    </Container>
  )
}
