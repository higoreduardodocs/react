import { useNavigate } from 'react-router-dom'

import {
  usePopulars,
  useTheaters,
  useTopRated,
  useWeekTrending,
} from '../../hooks/use-film'
import { imageSrc, mergeFilms } from '../../utils/format'
import Card from '../components/ui/card.tsx'
import Container from '../components/ui/container'
import Heading from '../components/ui/heading'
import Hero from '../components/ui/hero'
import NoResults from '../components/ui/no-results'
import Slider from '../components/ui/slider'
import Trailler from '../components/ui/trailler'

export default function Home() {
  const navigate = useNavigate()
  const trendings = mergeFilms(useWeekTrending('movie'), useWeekTrending('tv'))
  const theaters = useTheaters()
  const populars = mergeFilms(usePopulars('movie'), usePopulars('tv'))
  const topRatedTv = useTopRated('tv')
  const topRatedMovie = useTopRated('movie')

  return (
    <Container>
      <Trailler />
      {/* HERO */}
      <Slider className="slick-hero" autoplay={true}>
        {(onSwipe: boolean) =>
          !trendings?.length ? (
            <NoResults />
          ) : (
            trendings?.map((item) => (
              <Hero
                key={item.id}
                film={item}
                onClick={() => {
                  !onSwipe
                  navigate(`/${item.mediaType}/${item.id}`)
                }}
              />
            ))
          )
        }
      </Slider>
      {/* THEATERS */}
      <Heading title="Em cartaz" />
      <Slider isMovieCard>
        {() =>
          !theaters?.length ? (
            <NoResults />
          ) : (
            theaters?.map((item) => (
              <Card
                key={item.id}
                src={imageSrc(item.coverPath)!}
                title={item.title}
                isPlayer
                onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
              />
            ))
          )
        }
      </Slider>
      {/* POPULAR */}
      <Heading title="Populares" />
      <Slider isMovieCard>
        {() =>
          !populars?.length ? (
            <NoResults />
          ) : (
            populars?.map((item) => (
              <Card
                key={item.id}
                src={imageSrc(item.coverPath)!}
                title={item.title}
                isPlayer
                onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
              />
            ))
          )
        }
      </Slider>
      {/* TOP RATED TV */}
      <Heading title="Melhores da TV" />
      <Slider isMovieCard>
        {() =>
          !topRatedTv?.length ? (
            <NoResults />
          ) : (
            topRatedTv?.map((item) => (
              <Card
                key={item.id}
                src={imageSrc(item.coverPath)!}
                title={item.title}
                isPlayer
                onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
              />
            ))
          )
        }
      </Slider>
      {/* TOP RATEDMOVIE */}
      <Heading title="Melhores filmes" />
      <Slider isMovieCard>
        {() =>
          !topRatedMovie?.length ? (
            <NoResults />
          ) : (
            topRatedMovie?.map((item) => (
              <Card
                key={item.id}
                src={imageSrc(item.coverPath)!}
                title={item.title}
                isPlayer
                onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
              />
            ))
          )
        }
      </Slider>
    </Container>
  )
}
