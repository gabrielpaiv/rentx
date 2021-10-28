import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Container, InputText, IconContainer } from './styles'

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: PasswordInputProps) {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  function handlePasswordVisibilityChange() {
    setIsVisible(prevState => !prevState)
  }
  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFilled || isFocused ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        secureTextEntry={!isVisible}
        autoCorrect={false}
      />
      <IconContainer isFocused={isFocused}>
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <Feather
            name={!isVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </BorderlessButton>
      </IconContainer>
    </Container>
  )
}
