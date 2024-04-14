/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import api from '../libs/api'
import {
  ICast,
  IEpisode,
  IFilm,
  ISeason,
  ITrailler,
  MediaType,
} from '../types/film-type'
import { formatFilmResponse } from '../utils/format'

export const useWeekTrending = (mediaType: MediaType): IFilm[] => {
  try {
    const { data } = useQuery({
      queryKey: [`trending-${mediaType}`],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          `/trending/${mediaType}/week`
        ),
      staleTime: 1000 * 60 * 1,
    })
    const results = data?.data.results
    return results!?.map((item) => formatFilmResponse(item, mediaType))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useTheaters = (): IFilm[] => {
  try {
    const { data } = useQuery({
      queryKey: ['theaters'],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          '/movie/now_playing'
        ),
      staleTime: 1000 * 60 * 1,
    })
    const results = data?.data.results
    return results!?.map((item) => formatFilmResponse(item, 'movie'))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const usePopulars = (mediaType: MediaType, page = 1): IFilm[] => {
  try {
    const { data } = useQuery({
      queryKey: ['populars'],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          `/${mediaType}/popular`,
          {
            params: { page },
          }
        ),
      staleTime: 1000 * 60 * 1,
    })
    const results = data?.data.results
    return results!?.map((item) => formatFilmResponse(item, mediaType))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useTopRated = (mediaType: MediaType, page = 1): IFilm[] => {
  try {
    const { data } = useQuery({
      queryKey: [`rated-${mediaType}`],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          `/${mediaType}/top_rated`,
          {
            params: { page },
          }
        ),
      staleTime: 1000 * 60 * 1,
    })
    const results = data?.data.results
    return results!?.map((item) => formatFilmResponse(item, mediaType))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useDetail = (
  mediaType: MediaType,
  id: number
): IFilm | undefined => {
  try {
    const { data } = useQuery({
      queryKey: [`detail-${id}`],
      queryFn: async () => await api.get(`/${mediaType}/${id}}`),
      staleTime: 1000 * 60 * 5,
    })

    if (!data) return
    return formatFilmResponse(data?.data, mediaType)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useCasts = (mediaType: MediaType, id: number): ICast[] => {
  try {
    const { data } = useQuery({
      queryKey: [`casts-${mediaType}-${id}`],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ cast: unknown[] }>>(
          `/${mediaType}/${id}/credits`
        ),
      staleTime: 1000 * 60 * 60 * 10,
    })

    return (
      data?.data?.cast?.map((item: any) => ({
        id: item.id,
        name: item.name,
        characterName: item.character,
        profilePath: item.profile_path,
      })) ?? []
    )
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useTraillers = (mediaType: MediaType, id: number): ITrailler[] => {
  try {
    const { data } = useQuery({
      queryKey: [`traillers-${mediaType}-${id}`],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          `/${mediaType}/${id}/videos`
        ),
      staleTime: 1000 * 60 * 60 * 10,
    })

    return (
      data?.data?.results
        .filter((item: any) => item.site.toLowerCase() === 'youtube')
        .map((item: any) => ({ id: item.id, key: item.key })) ?? []
    )
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useRecommedations = (
  mediaType: MediaType,
  id: number
): IFilm[] => {
  try {
    const { data } = useQuery({
      queryKey: [`recommedations-${mediaType}-${id}`],
      queryFn: async () =>
        await api.get<unknown, AxiosResponse<{ results: unknown[] }>>(
          `/${mediaType}/${id}/recommendations`
        ),
    })

    const results = data?.data.results
    return results!?.map((item) => formatFilmResponse(item, mediaType))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useSeason = (tvId: number, seasonNumber: number): ISeason => {
  try {
    const { data } = useQuery({
      queryKey: [`season-${tvId}-${seasonNumber}`],
      queryFn: async () => await api.get(`/tv/${tvId}/season/${seasonNumber}`),
      staleTime: 1000 * 60 * 60,
    })
    const { data: season } = useQuery({
      queryKey: [`detail-${tvId}`],
      queryFn: async () => await api.get(`/tv/${tvId}}`),
      staleTime: 1000 * 60 * 60,
    })

    return {
      id: data?.data.id,
      fileName: season?.data?.title || '',
      name: data?.data.name,
      seasonNumber: data?.data.season_number,
      posterPath: data?.data.poster_path,
      airDate: data?.data.ait_date,
      episodes: data?.data.episodes.map(
        (item: any) =>
          ({
            id: item.id,
            title: item.name,
            overview: item.overview,
            stillPath: item.still_path,
            episodeNumber: item.episode_number,
            airDate: item.air_date,
          } satisfies IEpisode)
      ),
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
