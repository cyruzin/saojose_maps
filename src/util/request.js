import axios from 'axios'
import { config } from './constants'

/**
 * For authentication requests.
 */

const authentication = axios.create({
    baseURL: config.authentication.BASE_URL,
    method: 'POST',
    headers: {
        common: {
            'Authorization': `Basic ${config.authentication.TOKEN}`
        }
    }
})

export const httpAuthentication = ({ data }) =>
    authentication({ data })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.message))


/**
 * For generic requests.
 */

export const httpFetch = ({ url, method, data, params }) =>
    axios({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.message))

