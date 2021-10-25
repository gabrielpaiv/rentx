import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '../../assets/logo.svg'
import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles'
import { RFValue } from 'react-native-responsive-fontsize'
import { Car } from '../../components/Car'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { Loading } from '../../components/Loading'
import { useTheme } from 'styled-components'

export function Home() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [cars, setCars] = useState<CarDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }
  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api
          .get<CarDTO[]>('cars')
          .then(response => response.data)
        setCars(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getCars()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {isLoading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}
