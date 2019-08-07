import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { AUTH_TOKEN, AUTH_URL, BASE_URL } from './constants'

export function httpRequestAuthetication({ body }) {
  return new Promise((resolve, reject) => {
    fetch(AUTH_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic'
      }
    })
      .then(parseJSON)
      .then((response) => {
        if (!response.ok) return reject(response.json.data)
        return resolve(response.json.data)
      })
      .catch(error => reject(error.message))
  })
}

export async function httpRequest(url, { method, body }) {
  try {
    const localData = await AsyncStorage.getItem('token')
    const data = JSON.parse(localData)

    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`
        }
      })
        .then(parseJSON)
        .then((response) => {
          if (!response.ok) return reject(response.json.data)
          return resolve(response.json.data)
        })
        .catch(error => reject(error.message))
    })
  } catch (error) {
    return error
  }
}

function parseJSON(response) {
  return new Promise(resolve => response.json()
    .then(json => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })))
}


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

maps.interceptors.request.use(
  async (config) => {
    const value = await AsyncStorage.getItem('token')
    const data = JSON.parse(value)
    const configHeaders = config
    configHeaders.headers.Authorization = `Bearer ${data.token}`
    return configHeaders
  },
  error => Promise.reject(error)
)

export const httpFetch = ({
  url, method, data, params
}) => maps({
  url,
  method,
  data,
  params
})
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.data))
