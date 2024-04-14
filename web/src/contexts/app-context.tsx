import { ReactNode, createContext, useEffect, useState } from 'react'

import { IGender, MediaType } from '../types/film-type'
import { apiGenders } from '../libs/fetcher'

interface IProps {
  children: ReactNode
}

type Genders = {
  [key in MediaType]: IGender[]
}

export const AppContext = createContext<{
  trailler: string
  setTrailler: (value: string) => void
  page: number
  setPage: (value: number) => void
  genders: Genders
}>({
  trailler: '',
  setTrailler: () => {},
  page: 1,
  setPage: () => {},
  genders: { movie: [], tv: [] },
})

export default function AppContextProvider({ children }: IProps) {
  const [trailler, setTrailler] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [genders, setGenders] = useState<Genders>({ movie: [], tv: [] })

  const fetch = async () => {
    setGenders({ movie: await apiGenders('movie'), tv: await apiGenders('tv') })
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <AppContext.Provider
      value={{ trailler, setTrailler, page, setPage, genders }}
    >
      {children}
    </AppContext.Provider>
  )
}
