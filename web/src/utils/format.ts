/* eslint-disable @typescript-eslint/no-explicit-any */

import { IFilm, ISeason, MediaType } from '../types/film-type'

export const mergeClassName = (first: string, last?: string) =>
  first + ' ' + (last || '')

export const formatFilmResponse = (obj: any, mediaType?: MediaType): IFilm => ({
  id: obj.id,
  mediaType: mediaType || obj.media_type,
  title: obj.title || obj.name,
  description: obj.overview,
  posterPath: obj.poster_path,
  coverPath: obj.backdrop_path,
  genderIds: obj.genres?.map((item: any) => item.id) ?? obj.genre_ids,
  seasons:
    obj?.seasons?.map(
      (item: any) =>
        ({
          id: item.id,
          fileName: obj.title,
          name: item.name,
          seasonNumber: item.season_number,
          posterPath: item.poster_path,
          episodes: [],
          airDate: item.air_date,
        } satisfies ISeason)
    ) || [],
})

export const isFilm = (film: any): film is IFilm => <IFilm>film !== undefined

export const mergeFilms = (movies: IFilm[], tvs: IFilm[], limit = 6) => {
  if (!movies?.length || !tvs?.length) return

  const arrs: IFilm[] = []

  for (let i = 0; i < limit; i++) {
    let film: unknown

    if (i % 2 == 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1]
      }
    } else {
      if (movies[i - 1]) {
        film = tvs[i - 1]
      }
    }

    if (isFilm(film)) arrs.push(film)
  }

  return arrs
}

export const imageSrc = (path: string) => {
  if (!path) return
  return `https://image.tmdb.org/t/p/original/${path}`
}

export const youtubeImageSrc = (path: string) => {
  if (!path) return
  return `https://img.youtube.com/vi/${path}/mqdefault.jpg`
}

export const formatDate = (val: string) => {
  const d = new Date(val)

  return (
    d.getDate().toString() +
    '/' +
    (d.getMonth() + 1).toString() +
    d.getFullYear().toString()
  )
}

export const toCapitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)
