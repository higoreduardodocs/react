/* eslint-disable react/prop-types */

import { useStateContext } from '../contexts/context'

function Button({ icon, size, content, handleOnClick }) {
  const { color } = useStateContext()

  return (
    <button
      type="button"
      onClick={handleOnClick}
      style={{ backgroundColor: color }}
      className={`text-${size} p-3 hover:drop-shadow-xl transition-all text-white`}
    >
      {icon} {content}
    </button>
  )
}

export default Button
