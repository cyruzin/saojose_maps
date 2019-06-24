import axios from 'axios'
import { AUTH_TOKEN, AUTH_URL, BASE_URL } from './constants'
import AsyncStorage from '@react-native-community/async-storage'

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

export const httpAuthentication = credentials =>
    authentication({ data: credentials })
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

maps.interceptors.request.use(response => {
    AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                const userData = JSON.parse(value)
                response.headers.Authorization = 'Bearer ' + userData.token
                return response
            }
        })

    return response
})

export const httpFetch = ({ url, method, data, params }) =>
    maps({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.data))
