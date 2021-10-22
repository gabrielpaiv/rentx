import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Container } from './styles'
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface BackButtonProps extends BorderlessButtonProps {
  color?: string
}

export function BackButton({ color, ...rest }: BackButtonProps) {
  const theme = useTheme()
  const navigation = useNavigation()
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
        onPress={handleGoBack}
      />
    </Container>
  )
}
