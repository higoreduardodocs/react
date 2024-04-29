import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container-xxl row align-items-center gap-md-0 gap-2 justify-content-between px-0 py-4 mx-auto">
        <div className="col-md-5 col-12 d-flex gap-3 align-items-center justify-content-md-start justify-content-center">
          <img src="/icons/newsletter.png" alt="Notícias" />
          <h2 className="mb-0 text-white">Receber promoções</h2>
        </div>

        <div className="col-md-7 col-12 d-flex gap-2">
          <input
            type="text"
            className="form-control py-1"
            placeholder="Insira seu email"
            aria-label="Insira seu email"
          />
          <button type="button" className="input-group-text p-2">
            Cadastrar
          </button>
        </div>
      </div>

      <div className="container-xxl row py-4 gap-md-1 gap-4 px-0 mx-auto">
        <div className="col-md-4 col-sm-6 text-sm-start text-center">
          <h4 className="text-white mb-4">Contato</h4>

          <div>
            <address className="text-white fs-6">
              Endereço: Rua do endereço N° 46,
              <br />
              São Paulo, SP
              <br />
              CEP: 131103-123
            </address>
            <a
              className="mt-3 d-block mb-1 text-white"
              href="tel:(11) 9 9999-9999"
            >
              (11) 9 9999-9999
            </a>
            <a
              className="mt-3 d-block mb-1 text-white"
              href="mailto:contato@email.com"
            >
              contato@email.com
            </a>

            <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
              <a className="text-white" href="#">
                <BsLinkedin className="fs-4" />
              </a>
              <a className="text-white" href="#">
                <BsInstagram className="fs-4" />
              </a>
              <a className="text-white" href="#">
                <BsGithub className="fs-4" />
              </a>
              <a className="text-white" href="#">
                <BsYoutube className="fs-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-5 text-sm-start text-center">
          <h4 className="text-white mb-4">Informações</h4>

          <div className="d-flex flex-column">
            <Link to="/termos-privacidade" className="text-white py-2 mb-1">
              Termos de privacidade
            </Link>
            <Link to="/politica-devolucoes" className="text-white py-2 mb-1">
              Política de devoluções
            </Link>
            <Link to="/termos-fretes" className="text-white py-2 mb-1">
              Termos de fretes
            </Link>
            <Link to="/termos-condicoes" className="text-white py-2 mb-1">
              Termos e condições
            </Link>
            <Link className="text-white py-2 mb-1">Blogs</Link>
          </div>
        </div>

        <div className="col-md-2 col-sm-6 text-sm-start text-center">
          <h4 className="text-white mb-4">Conta</h4>
          <div className="footer-link d-flex flex-column">
            <Link className="text-white py-2 mb-1">Sobre</Link>
            <Link className="text-white py-2 mb-1">FAQ</Link>
            <Link className="text-white py-2 mb-1">Contato</Link>
          </div>
        </div>

        <div className="col-md-2 col-sm-5 text-sm-start text-center">
          <h4 className="text-white mb-4">Links</h4>
          <div className="footer-link d-flex flex-column">
            <Link className="text-white py-2 mb-1">Laptops</Link>
            <Link className="text-white py-2 mb-1">Headphones</Link>
            <Link className="text-white py-2 mb-1">Tablets</Link>
            <Link className="text-white py-2 mb-1">Watch</Link>
          </div>
        </div>
      </div>

      <div className="container-xxl mx-auto py-4 px-0">
        <p className="text-center mb-0 text-white">
          &copy; {new Date().getFullYear()} | Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer
