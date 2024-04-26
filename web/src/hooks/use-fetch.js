import { useCallback, useEffect, useState } from 'react'

import { fetchDataFromApi } from 'src/libs/api'

const useFetch = (url) => {
  const [data, setData] = useState([])

  const getDataApi = useCallback(async () => {
    const res = await fetchDataFromApi(url)
    setData(res?.data)
  }, [url])

  useEffect(() => {
    if (url) getDataApi()
  }, [url, getDataApi])

  return data
}
export default useFetch
