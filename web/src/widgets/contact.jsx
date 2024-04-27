import { styled } from 'styled-components'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

import Map from '../components/map'

const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
`

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  scroll-snap-align: center;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`

const Title = styled.h1`
  font-weight: 200;
`

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`

const TextArea = styled.textarea`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`

const Button = styled.button`
  font-weight: bold;
  padding: 20px;
  color: #fff;
  background-color: #da4ea2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const Contact = () => {
  const form = useRef()
  const [success, setSuccess] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text)
          setSuccess(true)
        },
        (error) => {
          console.log(error.text)
          setSuccess(false)
        }
      )
  }

  return (
    <Section>
      <Container>
        <Left>
          <Form ref={form} onSubmit={sendEmail}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" name="email" />
            <TextArea
              placeholder="Write your message"
              rows={10}
              name="message"
            />
            <Button>Send</Button>
            {success &&
              "Your message has been sent. We'll get back to you soon :)"}
          </Form>
        </Left>

        <Right>
          <Map />
        </Right>
      </Container>
    </Section>
  )
}

export default Contact
