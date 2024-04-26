import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

import './footer.style.scss'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer--content">
        <div className="footer--content-box">
          <h3 className="footer--content-box--title">About</h3>
          <p className="footer--content-box--about">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            quas praesentium, unde nulla itaque iure quae velit! Doloremque
            cupiditate esse maiores debitis suscipit non architecto, dolorum
            quod exercitationem at alias!
          </p>
        </div>

        <div className="footer--content-box">
          <h3 className="footer--content-box--title">Contact</h3>
          <span className="footer--content-box--contact">
            <MdLocationOn />
            Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha, Kerala, 688006
          </span>
          <span className="footer--content-box--contact">
            <MdPhone />
            0471 272 0261
          </span>
          <span className="footer--content-box--contact">
            <MdEmail />
            store@email.com
          </span>
        </div>

        <div className="footer--content-box">
          <h3 className="footer--content-box--title">Categories</h3>
          <span>Headphones</span>
          <span>Smart Watches</span>
          <span>Bluetooth Speakers</span>
          <span>Wireless Earbuds</span>
          <span>Home Theatre</span>
          <span>Projectors</span>
        </div>

        <div className="footer--content-box">
          <h3 className="footer--content-box--title">Pages</h3>
          <span>Home</span>
          <span>About</span>
          <span>Privacy Policy</span>
          <span>Returns</span>
          <span>Terms & Conditions</span>
          <span>Contact Us</span>
        </div>
      </div>

      <p className="footer--description">
        <span className="footer--description-credit">
          StoreDev. 2023 All rights reserved
        </span>
        <img
          src="/images/payments.png"
          alt="Payment"
          className="footer--description-payment"
        />
      </p>
    </footer>
  )
}

export default Footer
