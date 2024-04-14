import { useNavigate, useParams } from 'react-router-dom'

import { useSeason } from '../../hooks/use-film'
import { formatDate, imageSrc } from '../../utils/format'
import Container from '../components/ui/container'
import Heading from '../components/ui/heading'
import Image from '../components/ui/image'
import Loading from '../components/ui/loading'

export default function Season() {
  const navigate = useNavigate()
  const params = useParams()
  const season = useSeason(
    parseInt(params.id as string),
    parseInt(params.seasonNumber as string)
  )

  return !season ? (
    <div className="p-6">
      <Loading />
    </div>
  ) : (
    <>
      {/* COVER */}
      <div className="relative h-[300px]">
        <div className="overlay-film-cover" />
        <Image
          src={imageSrc(season.posterPath) || ''}
          className="rounded-none"
        />
      </div>
      {/* POSTER */}
      <Container className="flex gap-3 mobile:flex-col">
        <Image
          src={imageSrc(season.posterPath) || ''}
          className="w-[150px] md:max-w-[150px]"
        />
        <div className="flex flex-col items-start gap-3">
          <p className="text-xl line-clamp-1">{season.fileName}</p>
          <div className="flex items-center gap-3">
            <p className="text-sm opacity-90">
              {season.name} ({new Date(season.airDate).getFullYear()})
            </p>
            <p className="text-sm opacity-90">
              &#8226; {season.episodes?.length} Episódios
            </p>
          </div>
        </div>
      </Container>
      {/* EPISODES */}
      <Heading title="Episódios" />
      <Container>
        {season?.episodes?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/tv/${item.id}`)}
            className="flex items-stretch mobile:flex-col gap-3 px-3 py-1.5 rounded-md cursor-pointer hover:bg-primary"
          >
            <Image
              src={imageSrc(item.stillPath) || ''}
              className="w-[300px] md:min-w-[300px] max-w-[300px] mobile:mx-auto"
            />
            <div>
              <p className="text-lg truncate">
                {item.episodeNumber}. {item.title}
              </p>
              <p className="font-semibold text-sm opacity-90">
                {formatDate(item.airDate)}
              </p>
              <p className="text-sm line-clamp-5">{item.overview}</p>
            </div>
          </div>
        ))}
      </Container>
    </>
  )
}
