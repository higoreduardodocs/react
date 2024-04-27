import { styled } from 'styled-components'

const Section = styled.section`
  display: flex;
  justify-content: center;
`

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1400px;
  padding: 10px;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`

const Logo = styled.img`
  height: 50px;
`

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style-type: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const ListItem = styled.li`
  cursor: pointer;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

const Navbar = () => {
  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/logo.png" />

          <List>
            <ListItem>Home</ListItem>
            <ListItem>Studio</ListItem>
            <ListItem>Wroks</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Links>

        <Icons>
          <Icon src="./img/search.png" />
          <Button type="button">Hire now</Button>
        </Icons>
      </Container>
    </Section>
  )
}

export default Navbar
