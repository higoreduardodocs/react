/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from 'axios'

import api from '../libs/api'
import { IFilm, IGender, ITrailler, MediaType } from '../types/film-type'
import { formatFilmResponse } from '../utils/format'

export const apiTrailler = async (
  mediaType: MediaType,
  id: number
): Promise<ITrailler[]> => {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<{ results: unknown[] }>
    >(`/${mediaType}/${id}/videos`)

    return (
      data?.results
        .filter((item: any) => item.site.toLowerCase() === 'youtube')
        .map((item: any) => ({ id: item.id, key: item.key })) ?? []
    )
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const apiSearch = async (
  query: string,
  page = 1
): Promise<{ totalPages: number; totalResults: number; films: IFilm[] }> => {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<{
        total_pages: number
        total_results: number
        results: unknown[]
      }>
    >(`/search/multi`, {
      params: { query, page },
    })

    return {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      films: data.results.map((item) => formatFilmResponse(item)),
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const apiGenders = async (mediaType: MediaType): Promise<IGender[]> => {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<{ genres: unknown[] }>
    >(`/genre/${mediaType}/list`)

    return data?.genres as IGender[]
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const apiDiscover = async (
  mediaType: MediaType,
  page = 1
): Promise<{ films: IFilm[]; totalPages: number }> => {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<{
        results: unknown[]
        total_pages: number
      }>
    >(`/discover/${mediaType}`, {
      params: { page },
    })

    return {
      films: data.results.map((item) => formatFilmResponse(item, mediaType)),
      totalPages: data.total_pages,
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const apiTopRated = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  films: IFilm[]
  totalPages: number
}> => {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<{
        total_pages: number
        results: unknown[]
      }>
    >(`/${mediaType}/top_rated`, {
      params: { page },
    })

    return {
      films: data.results.map((item) => formatFilmResponse(item, mediaType)),
      totalPages: data.total_pages,
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
