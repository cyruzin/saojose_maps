// @flow

import AsyncStorage from '@react-native-community/async-storage'
import {AUTH_URL, BASE_URL} from './constants'

// For authentication requests.
export const httpRequestAuthetication = ({body}: Object): Promise<any> =>
  new Promise((resolve, reject) =>
    fetch(AUTH_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic',
      },
    })
      .then(parseJSON)
      .then(response =>
        response.ok ? resolve(response.json.data) : reject(response.json.data),
      )
      .catch(error => reject(error.message)),
  )

// For generic requests.
export async function httpRequest(
  url: string,
  {
    method,
    body,
    headers,
  }: {
    method: string,
    body?: Object,
    headers?: Object,
  },
): Promise<any> {
  try {
    const localData: string = await AsyncStorage.getItem('token')
    const data: any = JSON.parse(localData)

    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method,
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data.token}`,
          ...headers,
        },
      })
        .then(parseJSON)
        .then(response => {
          if (!response.ok) return reject(response.json.data)
          return resolve(response.json.data)
        })
        .catch(error => reject(error))
    })
  } catch (error) {
    return error.message
  }
}

// Transform response to JSON.
const parseJSON = (response: Object): Promise<any> =>
  new Promise(resolve =>
    response.json().then(json =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      }),
    ),
  )
