import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo'
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'

import { Car } from '../../components/Car'

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles'
import { LoadingAnimation } from '../../components/LoadingAnimation'

export function Home() {
  const navigation = useNavigation()
  const netInfo = useNetInfo()
  const [cars, setCars] = useState<ModelCar[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get<any>(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        )
        const { changes, latestVersion } = response.data
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users
        api.post('users/sync', user)
      }
    })
  }

  useEffect(() => {
    let isMounted = true
    async function getCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected])

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
