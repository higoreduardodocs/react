import { useNavigate } from 'react-router-dom'

import { useWeekTrending } from '../../hooks/use-film'
import { mergeFilms } from '../../utils/format'
import Container from '../components/ui/container'
import Heading from '../components/ui/heading'
import Hero from '../components/ui/hero'
import NoResults from '../components/ui/no-results'
import Slider from '../components/ui/slider'

export default function NotFound() {
  const navigate = useNavigate()
  const trendings = mergeFilms(useWeekTrending('movie'), useWeekTrending('tv'))

  return (
    <>
      <div className="relative h-[120px]">
        <div className="overlay-film-cover" />
        <div className="h-full w-full bg-primary" />
      </div>
      <Heading title="Página não encontrada" />
      <Container>
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
      </Container>
    </>
  )
}
