import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

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
  About,
  Accessories,
  Footer
} from './styles'
import { Button } from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CarDTO } from '../../dtos/CarDTO'
import { StatusBar } from 'react-native'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

type Params = {
  car: CarDTO
}

export function CarDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params

  function handleSelectRentalPeriod() {
    navigation.navigate('Scheduling')
  }
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
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accesory => (
            <Accessory
              name={accesory.name}
              icon={getAccessoryIcon(accesory.type)}
              key={accesory.type}
            />
          ))}
        </Accessories>
        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleSelectRentalPeriod}
        />
      </Footer>
    </CarContainer>
  )
}
