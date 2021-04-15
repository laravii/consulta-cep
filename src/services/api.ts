import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://webmaniabr.com/api/1/cep/',
})
