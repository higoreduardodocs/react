import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import { styled } from 'styled-components'

import Shoe from './shoe'

const Description = styled.div`
  position: absolute;
  bottom: 100px;
  right: 100px;
  width: 200px;
  height: 70px;
  padding: 20px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  font-size: 14px;
`

function ProductDesign() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Stage environment="city" intensity={0.6}>
            <Shoe />
          </Stage>
        </Suspense>
      </Canvas>

      <Description>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Description>
    </>
  )
}

export default ProductDesign
