import React from 'react'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { CarDetailsContainer, Header, CarImages } from './styles'

export function CarDetails() {
  return (
    <CarDetailsContainer>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={[
            'https://groupeparkavenue.com/sites/default/files/styles/scale_1200/https/images.swift.fuseinteractive.ca/chrome/media/ChromeImageGallery/ColorMatched_01/Transparent/1280/cc_2019AUC19_01_1280/cc_2019AUC190001_01_1280_2Y2Y.png?itok=ah1rvJ4M'
          ]}
        />
      </CarImages>
    </CarDetailsContainer>
  )
}
