import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { styled } from 'styled-components'

// import Chair from "./chair";
import Mac from './mac'

const Description = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
  width: 200px;
  height: 70px;
  padding: 20px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  font-size: 14px;
`

function WebDesign() {
  return (
    <>
      <Canvas>
        <OrbitControls enableZoom={false} />
        <Stage environment="city" intensity={0.6}>
          {/* <Chair /> */}
          <Mac />
        </Stage>
      </Canvas>

      <Description>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Description>
    </>
  )
}

export default WebDesign
