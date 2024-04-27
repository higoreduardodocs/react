import { useState } from 'react'
import { styled } from 'styled-components'

import { works } from 'src/utils/data'
import WebDesign from 'src/components/web-design'
import Development from 'src/components/development'
import Illustration from 'src/components/illustration'
import ProductDesign from 'src/components/product-design'
import SocialMedia from 'src/components/social-media'

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

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
  }
`

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ListItem = styled.li`
  position: relative;
  font-size: 90px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 1px #fff;
  cursor: pointer;

  &::after {
    position: absolute;
    content: '${(props) => props.text}';
    top: 0;
    left: 0;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    color: pink;
  }

  &:hover::after {
    animation: moveText 500ms linear both;

    @keyframes moveText {
      to {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: #fff;
    -webkit-text-stroke: 0px;
  }
`

const Right = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Works = () => {
  const [work, setWork] = useState('Web Design')

  return (
    <Section>
      <Container>
        <Left>
          <List>
            {works?.length > 0 &&
              works.map((item, i) => (
                <ListItem key={i} text={item} onClick={() => setWork(item)}>
                  {item}
                </ListItem>
              ))}
          </List>
        </Left>

        <Right>
          {work === 'Web Design' ? (
            <WebDesign />
          ) : work === 'Development' ? (
            <Development />
          ) : work === 'Illustration' ? (
            <Illustration />
          ) : work === 'Product Design' ? (
            <ProductDesign />
          ) : (
            <SocialMedia />
          )}
        </Right>
      </Container>
    </Section>
  )
}

export default Works
