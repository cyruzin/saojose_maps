import axios from 'axios'

/**
 * For authentication request.
 */
const authentication = axios.create({
    baseURL: 'http://dev.gddoc.com.br/maps_sj/auth/user/senha',
    method: 'POST',
    headers: {
        common: {
            'Authorization': 'Basic 1cdef3b1a4d936ee05eff21a4da3e418d3bc76f9b287c42c3089eb7379c0'
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

