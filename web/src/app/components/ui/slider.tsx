import { ReactNode, useState } from 'react'
import Slick, { Settings } from 'react-slick'

interface IProps extends Omit<Settings, 'children'> {
  isMovieCard?: boolean
  children?: (onSwipe: boolean) => ReactNode
}

export default function Slider(props: IProps) {
  const [onSwipe, setOnSwipe] = useState(false)
  let settings: Omit<Settings, 'children'> = { ...props }

  if (props.isMovieCard) {
    settings = {
      ...settings,
      infinite: true,
      swipe: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
  }

  return (
    <Slick
      autoplay={false}
      autoplaySpeed={5000}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
      slidesToShow={1}
      slidesToScroll={1}
      {...settings}
    >
      {props.children && props.children(onSwipe)}
    </Slick>
  )
}
