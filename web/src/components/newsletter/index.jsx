import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

import './newsletter.style.scss'

function Newsletter() {
  return (
    <article className="newsletter">
      <h5 className="newsletter--title">Newsletter</h5>
      <span className="newsletter--cta">
        Sign up for latest updates and offers
      </span>

      <form className="newsletter--form">
        <input
          type="text"
          className="newsletter--form-input"
          placeholder="Email address"
        />
        <button type="button" className="newsletter--form-button">
          Subscribe
        </button>
      </form>

      <span className="newsletter--description">
        Will be used in accordance with our Privacy Policy
      </span>

      <div className="newsletter--icons">
        <span className="icon">
          <FaFacebookF />
        </span>
        <span className="icon">
          <FaInstagram />
        </span>
        <span className="icon">
          <FaTwitter />
        </span>
        <span className="icon">
          <FaLinkedin />
        </span>
      </div>
    </article>
  )
}

export default Newsletter
