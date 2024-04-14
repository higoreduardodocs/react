/* eslint-disable no-case-declarations */

import { useEffect, useRef, useState } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { IFilm, MediaType } from '../../types/film-type'
import { apiDiscover, apiSearch, apiTopRated } from '../../libs/fetcher'
import { imageSrc, toCapitalize } from '../../utils/format'
import Card from '../components/ui/card'
import Container from '../components/ui/container'
import Heading from '../components/ui/heading'
import Loading from '../components/ui/loading'
import NoResults from '../components/ui/no-results'

interface IProps {
  type: MediaType | 'search' | 'list'
}

export default function Search(props: IProps) {
  const [query] = useSearchParams()
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [films, setFilms] = useState<IFilm[]>([])
  const page = useRef(1)
  const totalPage = useRef(2)
  const loading = useRef(false)
  let request: (page: number) => Promise<{
    totalPages: number
    films: IFilm[]
  }>

  const switchType = (type: MediaType | 'search' | 'list') => {
    switch (type) {
      case 'movie':
        request = (page: number) => apiDiscover('movie', page)
        return 'Filmes'
      case 'tv':
        request = (page: number) => apiDiscover('tv', page)
        return 'TV'
      case 'search':
        request = (page: number) => apiSearch(query.get('q') || '', page)
        return `Resultados da busca:&nbsp;<i>${query.get('q')!}</i>`
      case 'list':
        const listTitle = params.listTitle as string

        if (listTitle === 'top-rated-tv')
          request = (page: number) => apiTopRated('tv', page)
        else if (listTitle === 'top-rated-movie')
          request = (page: number) => apiTopRated('movie', page)
        return toCapitalize(listTitle.split('-').join(' '))
      default:
        break
    }
  }
  const title = switchType(props.type)
  const fetch = async () => {
    loading.current = true
    const { films, totalPages } = await request(page.current)
    loading.current = false
    totalPage.current = totalPages
    setFilms((prevState) => [...prevState, ...films])
  }
  const onWindowScroll = () => {
    if (loading.current) return
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (totalPage.current > page.current) {
        page.current++
        fetch()
      }
    }
  }

  useEffect(() => {
    setFilms([])
    fetch()
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll)
    return () => window.removeEventListener('scroll', onWindowScroll)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="relative h-[120px]">
        <div className="overlay-film-cover" />
        <div className="h-full w-full bg-primary" />
      </div>
      <Heading title={title || 'Pesquisa'} />
      <Container className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {loading.current ? (
          <Loading />
        ) : !films.length ? (
          <NoResults />
        ) : (
          films.map((item, key) => (
            <Card
              key={key}
              src={imageSrc(item.posterPath) || ''}
              title={item.title}
              isPlayer
              onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
            />
          ))
        )}
      </Container>
    </>
  )
}
