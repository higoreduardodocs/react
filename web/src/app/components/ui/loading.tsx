import { FaSpinner } from 'react-icons/fa'

export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-3">
      <FaSpinner className="animate-spin" size={18} />
      <span>Carregando...</span>
    </div>
  )
}
