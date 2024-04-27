import { styled } from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

import Navbar from './navbar'

const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 1400px;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  scroll-snap-align: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
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

  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Right = styled.div`
  flex: 3;
  position: relative;

  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`

const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 800px;
  height: 600px;
  object-fit: contain;
  animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }

  @media only screen and (max-width: 768px) {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 300px;
  }
`

const Hero = () => {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
          <Title>Think. Make. Solve.</Title>
          <Headline>
            <Line src="./img/line.png" />
            <SubTitle>What we Do</SubTitle>
          </Headline>
          <Description>
            we enjoy creating delightful, human-centered digital experiences.
          </Description>
          <Button>Learn More</Button>
        </Left>

        <Right>
          <Canvas>
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            {/* SPHERE */}
            <Sphere args={[1, 100, 200]} scale={2.5}>
              <MeshDistortMaterial
                color="#3d1c56"
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
          </Canvas>
          <Img src="./img/moon.png" />
        </Right>
      </Container>
    </Section>
  )
}

export default Hero
