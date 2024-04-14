import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFilm } from '../../../types/film-type'
import { apiSearch } from '../../../libs/fetcher'
import { imageSrc } from '../../../utils/format'
import NoResults from './no-results'
import Image from './image'
import GenderList from './gender-list.tsx'

interface IProps {
  searchKeyword: string
  handleSearchPage: () => void
}

export default function SearchResults(props: IProps) {
  const navigate = useNavigate()
  const [films, setFilms] = useState<IFilm[]>([])
  const [totalResults, setTotalResults] = useState<number>(0)

  const fetch = async () => {
    if (!props.searchKeyword) return
    const { films, totalResults } = await apiSearch(props.searchKeyword)
    setFilms(films)
    setTotalResults(totalResults)
    console.log(films)
  }
  useEffect(() => {
    fetch()
  }, [props.searchKeyword]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute top-[50px] left-0 right-0 bg-header rounded-lg shadow-lg">
      {!films.length ? (
        <NoResults />
      ) : (
        <div className="flex flex-col gap-3 max-h-[480px] pl-3 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-header">
          {films.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
              className="flex items-start gap-3 p-2 hover:bg-primary cursor-pointer"
            >
              <Image
                src={imageSrc(item.coverPath) || ''}
                className="w-[100px] h-[190px]"
              />
              <div className="flex flex-col gap-2 w-[200px] max-w-[200px]">
                <p className="text-base truncate">{item.title}</p>
                <GenderList
                  genders={item.genderIds}
                  mediaType={item.mediaType}
                />
                <p className="text-sm line-clamp-4">{item.description}</p>
              </div>
            </div>
          ))}
          {totalResults > 20 && (
            <button
              type="button"
              onClick={props.handleSearchPage}
              className="sticky bottom-0 w-full px-3 py-1.5 bg-primary rounded-md hover:text-body shadow-lg"
            >
              Mais resultados
            </button>
          )}
        </div>
      )}
    </div>
  )
}
