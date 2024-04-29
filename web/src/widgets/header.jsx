/* eslint-disable react/prop-types */

function Header({ category, title }) {
  return (
    <header className="mb-10">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
        {title}
      </p>
    </header>
  )
}

export default Header
