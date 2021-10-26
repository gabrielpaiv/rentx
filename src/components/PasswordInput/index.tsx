import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Container, InputText, IconContainer } from './styles'

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: PasswordInputProps) {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  function handlePasswordVisibilityChange() {
    setIsVisible(prevState => !prevState)
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isVisible} />
      <IconContainer>
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <Feather
            name={isVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </BorderlessButton>
      </IconContainer>
    </Container>
  )
}
