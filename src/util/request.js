import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { AUTH_TOKEN, AUTH_URL, BASE_URL } from './constants'

/**
 * For authentication requests.
 */

const authentication = axios.create({
  baseURL: AUTH_URL,
  method: 'POST',
  headers: {
    authorization: `Basic ${AUTH_TOKEN}`
  }
})

export const httpAuthentication = credentials => authentication({ data: credentials })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.data))

/**
 * For generic requests.
 */

const maps = axios.create({
  baseURL: BASE_URL
})

/**
 * Setting headers.
 */

maps.interceptors.request.use(async (config) => {
  const value = await AsyncStorage.getItem('token')
  const data = JSON.parse(value)
  const configHeaders = config
  configHeaders.headers.Authorization = `Bearer ${data.token}`
  return configHeaders
}, error => Promise.reject(error))

export const httpFetch = ({
  url, method, data, params
}) => maps({
  url, method, data, params
})
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.data))
