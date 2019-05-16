import axios from 'axios'

const authentication = axios.create({
    baseURL: 'https://www.google.com.br'
})

export const httpFetch = ({ url, method, data, params }) =>
    authentication({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data.message))

