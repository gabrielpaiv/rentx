import React, { useEffect, useState } from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { Feather } from '@expo/vector-icons'

import {
  CarContainer,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles'
import { Button } from '../../components/Button'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, StatusBar } from 'react-native'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { CarDTO } from '../../dtos/CarDTO'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { api } from '../../services/api'

type Params = {
  car: CarDTO
  dates: string[]
}

type RentalPeriod = {
  start: string
  end: string
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const navigation = useNavigation()

  const route = useRoute()
  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * car.price)

  async function handleConfirmRental() {
    setIsLoading(true)
    const schedulesByCar = await api.get<any>(`schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ]

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      )
    })

    await api
      .put(`schedules_bycars/${car.id}`, { id: car.id, unavailable_dates })
      .then(() =>
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
          nextScreenRoute: 'Home'
        })
      )
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento.')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      )
    })
  }, [])

  return (
    <CarContainer>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
              key={accessory.id}
            />
          ))}
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </CarContainer>
  )
}
