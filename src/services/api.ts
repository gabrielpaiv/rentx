import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.220.9.107:3333'
})
