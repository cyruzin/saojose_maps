import axios from 'axios'
import { AUTH_TOKEN, AUTH_URL, BASE_URL } from './constants'
import store from '../redux'

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

maps.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + store.getState().authentication.token
    return config
})

export const httpFetch = ({ url, method, data, params }) =>
    maps({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.data))
