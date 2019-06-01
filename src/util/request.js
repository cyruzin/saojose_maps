import axios from 'axios'
import { TOKEN, BASE_URL } from './constants'

/**
 * For authentication requests.
 */

const authentication = axios.create({
    //baseURL: configuration.authentication.BASE_URL,

})

export const httpAuthentication = credentials => {
    async (params) => await (await fetch(params).json())
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic 1cdef3b1a4d936ee05eff21a4da3e418d3bc76f9b287c42c3089eb7379c0"
        }
    }
    return axios.post(BASE_URL, credentials, config)
        .then(response => {
            console.log(response.data)
            response.data
        })
        .catch(error => Promise.reject(error.response))
}

/**
 * For generic requests.
 */

export const httpFetch = ({ url, method, data, params }) =>
    axios({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.message))

