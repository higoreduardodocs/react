import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { styled } from 'styled-components'

import Atom from './atom'

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

function Development() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Atom />
        </Suspense>
      </Canvas>

      <Description>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Description>
    </>
  )
}

export default Development
