import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles'

import { Feather } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from '../../components/Button'
import { useNetInfo } from '@react-native-community/netinfo'

export function Profile() {
  const theme = useTheme()
  const { user, signOut, updateUser } = useAuth()
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('O nome é obrigatório')
      })
      const data = { name, driverLicense }
      await schema.validate(data)
      await updateUser({
        user_id: user.user_id,
        id: user.id,
        email: user.email,
        token: user.token,
        name,
        driver_license: driverLicense,
        avatar
      })
      navigation.navigate('Confirmation', {
        title: 'Feito!',
        message: `Seus dados\nforam atualizados.`,
        nextScreenRoute: 'Home'
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Epa!', error.message)
      } else {
        Alert.alert('Ops', 'Não foi possível atualizar o perfil')
      }
    }
  }

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && selectedOption === 'passwordEdit') {
      Alert.alert(
        'Você está Offline',
        'Para mudar a senha, conecte-se à internet.'
      )
    }
    setOption(selectedOption)
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem Certeza?',
      'Se você sair, irá precisar de uma conexão para entrar novamente.',
      [
        { text: 'Cancelar', onPress: () => {} },
        { text: 'Sair', onPress: () => signOut() }
      ]
    )
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={{ marginBottom: useBottomTabBarHeight() }}>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  autoCorrect={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Confirmar Senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
