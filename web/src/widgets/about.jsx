import { styled } from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Cube from 'src/components/cube'

const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
`

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 1400px;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  scroll-snap-align: center;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    font-size: 60px;
  }
`

const Headline = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Line = styled.img`
  height: 5px;
`

const SubTitle = styled.h2`
  color: #da4ea2;
`

const Description = styled.p`
  font-size: 24px;
  color: lightgray;
`

const Button = styled.button`
  width: 120px;
  padding: 10px;
  background-color: #da4ea2;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const About = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Canvas camera={{ fov: 25, position: [5, 5, 5] }}>
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            {/* CUBE */}
            <Cube />
          </Canvas>
        </Left>

        <Right>
          <Title>Think outside the square space</Title>
          <Headline>
            <Line src="./img/line.png" />
            <SubTitle>Who we Are</SubTitle>
          </Headline>
          <Description>
            a creative group of designers and developers with a passion for the
            arts.
          </Description>
          <Button>See our works</Button>
        </Right>
      </Container>
    </Section>
  )
}

export default About
