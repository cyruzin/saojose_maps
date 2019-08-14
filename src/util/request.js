import AsyncStorage from '@react-native-community/async-storage'
import { AUTH_URL, BASE_URL } from './constants'

/**
 * For authentication requests.
 */

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

/**
 * For generic requests.
 */

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
