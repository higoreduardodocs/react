/* eslint-disable react/prop-types */

const Container = ({ className, children }) => {
  return (
    <section className={className}>
      <div className="container-xxl">{children}</div>
    </section>
  )
}

export default Container
