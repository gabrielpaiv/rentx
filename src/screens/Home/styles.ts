import styled, { useTheme } from 'styled-components/native'

export const HomeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`
