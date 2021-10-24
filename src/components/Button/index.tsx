import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { Container, Title } from './styles'

interface ButtonProps extends RectButtonProps {
  title: string
  color?: string
  isLoading?: boolean
  enabled?: boolean
}

export function Button({
  title,
  color,
  isLoading = false,
  enabled = true,
  ...rest
}: ButtonProps) {
  const theme = useTheme()
  return (
    <Container
      color={color}
      {...rest}
      style={{ opacity: isLoading || !enabled ? 0.5 : 1 }}
      enabled={enabled}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  )
}
