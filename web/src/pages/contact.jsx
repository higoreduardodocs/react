import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi'

import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const Contact = () => {
  return (
    <>
      <Breadcrumb title="Contato" />

      <Container className="py-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6986.771103663534!2d76.99275607711007!3d28.886888929272477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da5e51463d4c9%3A0xe5a485e2ac7c3d4a!2sMandaura%2C%20Haryana%20131103!5e0!3m2!1sen!2sin!4v1669909087902!5m2!1sen!2sin"
          width="600"
          height="450"
          className="border-0 w-100"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact-inner-wrapper d-flex justify-content-between">
          <div>
            <h3 className="contact-title mb-4">Fale conosco</h3>
            <form className="d-flex flex-column gap-2">
              <input type="text" className="form-control" placeholder="Nome" />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <input
                type="tel"
                className="form-control"
                placeholder="WhatsApp"
              />
              <textarea
                className="w-100 form-control"
                cols="30"
                rows="4"
                placeholder="Mensagem"
              ></textarea>
              <button className="button border-0">Enviar mensagem</button>
            </form>
          </div>

          <div>
            <h3 className="contact-title mb-4">Nossos contatos</h3>
            <ul className="ps-0">
              <li className="mb-3 d-flex gap-2 align-items-center">
                <AiOutlineHome className="fs-5" />
                <address className="mb-0">
                  Endereço: Rua do endereço N° 46, São Paulo, SP CEP: 131103-123
                </address>
              </li>
              <li className="mb-3 d-flex gap-2 align-items-center">
                <BiPhoneCall className="fs-5" />
                <a href="tel:(11) 9 9999-9999">(11) 9 9999-9999</a>
              </li>
              <li className="mb-3 d-flex gap-2 align-items-center">
                <AiOutlineMail className="fs-5" />
                <a href="mailto:contato@email.com">contato@email.com</a>
              </li>
              <li className="mb-3 d-flex gap-2 align-items-center">
                <BiInfoCircle className="fs-5" />
                <p className="mb-0">Segunda à Sexta: 10:00 às 20:00h</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact
