export type MediaType = 'tv' | 'movie'

export interface IFilm {
  id: number
  mediaType: MediaType
  title: string
  description: string
  posterPath: string
  coverPath: string
  genderIds: number[]
  seasons: ISeason[]
}

export interface ISeason {
  id: number
  fileName: string
  name: string
  seasonNumber: number
  posterPath: string
  episodes: IEpisode[]
  airDate: string
}

export interface IEpisode {
  id: number
  title: string
  overview: string
  stillPath: string
  episodeNumber: number
  airDate: string
}

export interface ITrailler {
  id: number
  key: string
}

export interface ICast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

export interface IGender {
  id: number
  name: string
}
