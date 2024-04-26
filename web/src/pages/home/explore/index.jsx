import './explore.style.scss'

function Explore() {
  return (
    <section className="explore">
      <div className="container">
        <h1>Explore the marketplace</h1>
        <div className="items">
          <div className="item">
            <img src="/img/graphics-design.svg" alt="Graphics & Design" />
            <div className="line"></div>
            <span>Graphics & Design</span>
          </div>

          <div className="item">
            <img src="/img/online-marketing.svg" alt="Digital Marketing" />
            <div className="line"></div>
            <span>Digital Marketing</span>
          </div>

          <div className="item">
            <img
              src="/img/writing-translation.svg"
              alt="Writing & Translation"
            />
            <div className="line"></div>
            <span>Writing & Translation</span>
          </div>

          <div className="item">
            <img src="/img/video-animation.svg" alt="Video & Animation" />
            <div className="line"></div>
            <span>Video & Animation</span>
          </div>

          <div className="item">
            <img src="/img/music-audio.svg" alt="Music & Audio" />
            <div className="line"></div>
            <span>Music & Audio</span>
          </div>

          <div className="item">
            <img src="/img/programming.svg" alt="Programming & Tech" />
            <div className="line"></div>
            <span>Programming & Tech</span>
          </div>

          <div className="item">
            <img src="/img/business.svg" alt="Business" />
            <div className="line"></div>
            <span>Business</span>
          </div>

          <div className="item">
            <img src="/img/lifestyle.svg" alt="Lifestyle" />
            <div className="line"></div>
            <span>Lifestyle</span>
          </div>

          <div className="item">
            <img src="/img/data.svg" alt="Data" />
            <div className="line"></div>
            <span>Data</span>
          </div>

          <div className="item">
            <img src="/img/photography.svg" alt="Photography" />
            <div className="line"></div>
            <span>Photography</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Explore
