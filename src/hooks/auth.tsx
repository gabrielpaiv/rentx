import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { database } from '../database'
import { api } from '../services/api'

import { User as ModelUser } from '../database/model/User'

type User = {
  id: string
  user_id: string
  name: string
  email: string
  driver_license: string
  avatar: string
  token: string
}

type SignInCredentials = {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  loading: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (user: User) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<any>('sessions', {
        email,
        password
      })

      const { token, user } = response.data
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        await userCollection.create(newUser => {
          ;(newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.token = token)
        })
      })

      setData({ token, ...user })
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.destroyPermanently()
      })
      setData({} as User)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.update(userData => {
          ;(userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar)
        })

        setData(user)
      })
    } catch (error) {
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users')
      const response = await userCollection.query().fetch()
      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${userData.token}`
        setLoading(false)
        setData(userData)
      }
    }
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
