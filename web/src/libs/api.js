import axios from 'axios'

const params = {
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
  },
}

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_STRAPI_API_URL + url,
      params
    )

    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const makePayment = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
  },
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
  headers: {
    Authorization: import.meta.env.VITE_STRAPI_API_TOKEN,
  },
})
