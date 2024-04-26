import './banner.style.scss'

function Banner() {
  return (
    <article className="banner">
      <div className="banner--content">
        <h1 className="banner--content-title">Sales</h1>
        <p className="banner--content-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam,
          dolore iste? Consequuntur velit cupiditate recusandae sit nemo sed.
          Placeat eligendi nam ratione maxime ut itaque optio facere rem ex
          corrupti.
        </p>
        <div className="banner--content-button-group">
          <button type="button">Read More</button>
          <button type="button">Shop Now</button>
        </div>
      </div>

      <img src="/images/banner-img.png" alt="Hero" className="banner--hero" />
    </article>
  )
}

export default Banner
