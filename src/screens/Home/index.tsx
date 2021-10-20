import { StatusBar } from 'react-native'
import React from 'react'

import Logo from '../../assets/logo.svg'

import {
  HomeContainer,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles'
import { RFValue } from 'react-native-responsive-fontsize'
import { Car } from '../../components/Car'

export function Home() {
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail:
      'https://groupeparkavenue.com/sites/default/files/styles/scale_1200/https/images.swift.fuseinteractive.ca/chrome/media/ChromeImageGallery/ColorMatched_01/Transparent/1280/cc_2019AUC19_01_1280/cc_2019AUC190001_01_1280_2Y2Y.png?itok=ah1rvJ4M'
  }
  return (
    <HomeContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => <Car data={carData} />}
        keyExtractor={item => String(item)}
      />
    </HomeContainer>
  )
}
