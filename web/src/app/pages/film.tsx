import { useNavigate, useParams } from 'react-router-dom'

import {
  useCasts,
  useDetail,
  useRecommedations,
  useTraillers,
} from '../../hooks/use-film'
import { MediaType } from '../../types/film-type'
import useApp from '../../hooks/use-app'
import { imageSrc, youtubeImageSrc } from '../../utils/format'
import Card from '../components/ui/card'
import Container from '../components/ui/container'
import Heading from '../components/ui/heading'
import Image from '../components/ui/image'
import Loading from '../components/ui/loading'
import Slider from '../components/ui/slider'
import Trailler from '../components/ui/trailler'
import GenderList from '../components/ui/gender-list'

interface IProps {
  mediaType: MediaType
}

export default function Film(props: IProps) {
  const navigate = useNavigate()
  const params = useParams()
  const { setTrailler } = useApp()
  const film = useDetail(props.mediaType, parseInt(params.id as string))
  const casts = useCasts(props.mediaType, parseInt(params.id as string))
  const traillers = useTraillers(props.mediaType, parseInt(params.id as string))
  const recommedations = useRecommedations(
    props.mediaType,
    parseInt(params.id as string)
  )

  const handleTrailler = (key: string) =>
    setTrailler(`https://www.youtube.com/embed/${key}?autoplay=1`)

  return (
    <>
      <Trailler />
      {!film ? (
        <div className="p-6">
          <Loading />
        </div>
      ) : (
        <>
          {/* COVER */}
          <div className="h-[300px] relative">
            <div className="overlay-film-cover" />
            <Image src={imageSrc(film.coverPath)!} className="rounded-none" />
          </div>
          {/* POSTER */}
          <Container className="flex mobile:flex-col">
            <Image
              src={imageSrc(film.posterPath)!}
              className="w-[200px] h-[300px] min-w-[200px] max-w-[200px]"
            />
            <div className="flex flex-col gap-3 px-3">
              <p className="text-xl line-clamp-1">{film.title}</p>
              <GenderList genders={film.genderIds} mediaType={film.mediaType} />
              <p className="text-sm line-clamp-3 opacity-90">
                {film.description}
              </p>
            </div>
          </Container>
          {/* CAST */}
          <Heading title="Elenco" />
          <Container className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-header">
            <div className="flex items-center gap-3">
              {casts?.map((item) => (
                <Card
                  key={item.id}
                  src={imageSrc(item.profilePath)!}
                  className="flex-shrink-0 w-[200px]"
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm opacity-90">{item.characterName}</p>
                </Card>
              ))}
            </div>
          </Container>
          {/* TRAILLERS */}
          <Heading title="Traillers" />
          <Container className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-header">
            <div className="flex items-center gap-3">
              {traillers?.map((item) => (
                <Card
                  key={item.id}
                  src={youtubeImageSrc(item.key) || ''}
                  className="flex-shrink-0 w-[200px]"
                  isPlayer
                  onClick={() => handleTrailler(item.key)}
                />
              ))}
            </div>
          </Container>
          {/* SEASONS */}
          <Heading title="Temporadas" />
          <Container>
            <Slider
              slidesToShow={film.seasons.length > 2 ? 2 : 1}
              slidesToScroll={film.seasons.length > 2 ? 2 : 1}
              swipe={false}
            >
              {() =>
                film?.seasons?.map((item) => (
                  <Card
                    key={item.id}
                    src={imageSrc(item.posterPath) || ''}
                    title={item.name}
                    onClick={() =>
                      navigate(`/tv/${item.id}/season/${item.seasonNumber}`)
                    }
                  />
                ))
              }
            </Slider>
          </Container>
          {/* RECOMMENDATIONS */}
          <Heading title="Recomendados" />
          <Container>
            <Slider isMovieCard>
              {() =>
                recommedations?.map((item) => (
                  <Card
                    key={item.id}
                    src={imageSrc(item.posterPath) || ''}
                    title={item.title}
                    className="h-[300px]"
                    isPlayer
                    onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                  />
                ))
              }
            </Slider>
          </Container>
        </>
      )}
    </>
  )
}
