/* eslint-disable react/prop-types */

const ChartsHeader = ({ category, title }) => (
  <div className="mb-10">
    <div>
      <p className="text-lg text-gray-400">Chart</p>
      <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">
        {category}
      </p>
    </div>
    <p className="text-sm font-extrabold tracking-tight text-gray-400">
      {title}
    </p>
  </div>
)

export default ChartsHeader
