import React from 'react'

import { ButtonContainer, Title } from './styles'

interface ButtonProps {
  title: string
  color?: string
}

export function Button({ title, color, ...rest }: ButtonProps) {
  return (
    <ButtonContainer color={color}>
      <Title>{title}</Title>
    </ButtonContainer>
  )
}
