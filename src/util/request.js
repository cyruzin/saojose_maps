import axios from 'axios'
import { TOKEN, BASE_URL } from './constants'

/**
 * For authentication requests.
 */

const authentication = axios.create({
    baseURL: BASE_URL,
    method: 'POST',
    headers: {
        Authorization: `Basic ${TOKEN}`
    }
})

export const httpAuthentication = credentials =>
    authentication({ data: credentials })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response))

/**
 * For generic requests.
 */

export const httpFetch = ({ url, method, data, params }) =>
    axios({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.message))
