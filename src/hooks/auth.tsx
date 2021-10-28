import React, { createContext, ReactNode, useContext, useState } from 'react'
import { api } from '../services/api'

type User = {
  id: string
  name: string
  email: string
  driver_license: string
  avatar: string
}

type AuthState = {
  token: string
  user: User
}

type SignInCredentials = {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState)

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<AuthState>('sessions', {
        email,
        password
      })

      const { token, user } = response.data
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({ token, user })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
