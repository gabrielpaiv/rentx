import { StatusBar } from 'react-native'
import React from 'react'

import Logo from '../../assets/logo.svg'

import { HomeContainer, Header, TotalCars, HeaderContent } from './styles'
import { RFValue } from 'react-native-responsive-fontsize'

export function Home() {
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
    </HomeContainer>
  )
}
