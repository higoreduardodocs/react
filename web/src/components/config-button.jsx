import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { FiSettings } from 'react-icons/fi'

import { useStateContext } from '../contexts/context'

function ConfigButton() {
  const { isSettings, setIsSettings } = useStateContext()

  return (
    <TooltipComponent content="settings" position="top">
      <button
        type="button"
        className="text-3xl p-3 transition-all dark:hover:drop-shadow-xl dark:hover:bg-light-gray dark:hover:text-black dark:text-white hover:bg-secondary-dark-bg hover:text-white text-slate-900"
        onClick={() => setIsSettings(!isSettings)}
      >
        <FiSettings />
      </button>
    </TooltipComponent>
  )
}

export default ConfigButton
