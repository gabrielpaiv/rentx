import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { Car as ModelCar } from '../../database/model/Car'
import { api } from '../../services/api'
import { AntDesign } from '@expo/vector-icons'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles'
import { LoadingAnimation } from '../../components/LoadingAnimation'
import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { format, parseISO } from 'date-fns'
import { useIsFocused } from '@react-navigation/native'

interface DataProps {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const screenFocus = useIsFocused()

  const theme = useTheme()

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get<any>('rentals')

        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })

        setCars(dataFormatted)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getCars()
  }, [screenFocus])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <Title>Seus agendamentos, estão aqui.</Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={item => item.car.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
