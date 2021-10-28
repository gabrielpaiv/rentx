import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import { Car } from '../../components/Car'

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles'
import { LoadingAnimation } from '../../components/LoadingAnimation'

export function Home() {
  const navigation = useNavigation()
  const [cars, setCars] = useState<CarDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true
    async function getCars() {
      try {
        const response = await api
          .get<CarDTO[]>('cars')
          .then(response => response.data)
        if (isMounted) {
          setCars(response)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    getCars()
    return () => {
      isMounted = false
    }
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
          <TotalCars>
            {isLoading ? '' : `Total de ${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Container>
  )
}
