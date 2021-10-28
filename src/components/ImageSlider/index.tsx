import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Bullet } from '../Bullet'

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles'

interface ImageSliderProps {
  imageUrl: {
    id: string
    photo: string
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imageUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imageUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={key => key.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}
