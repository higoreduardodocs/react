import { styled } from 'styled-components'

import Hero from './widgets/hero'
import About from './widgets/about'
import Works from './widgets/works'
import Contact from './widgets/contact'

const Main = styled.main`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  background: url('./img/bg.jpeg');
  color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
`

export default function App() {
  return (
    <Main>
      <Hero />
      <About />
      <Works />
      <Contact />
    </Main>
  )
}
