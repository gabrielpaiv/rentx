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
import { useNetInfo } from '@react-native-community/netinfo'

type Params = {
  car: CarDTO
  dates: string[]
}

type RentalPeriod = {
  start: string
  end: string
}

export function SchedulingDetails() {
  const netInfo = useNetInfo()

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
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

    await api
      .post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`,
          nextScreenRoute: 'Home'
        })
      )
      .catch(() => {
        setIsLoading(false)
        Alert.alert('N??o foi poss??vel confirmar o agendamento.')
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

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api
        .get<CarDTO>(`cars/${car.id}`)
        .then(response => response.data)
      setCarUpdated(response)
    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated()
    }
  }, [netInfo.isConnected])

  return (
    <CarContainer>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
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
        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
                key={accessory.id}
              />
            ))}
          </Accessories>
        )}
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
            <DateTitle>AT??</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} di??rias
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
