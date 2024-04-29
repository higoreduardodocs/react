import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { MdOutlineCancel } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'

import { useStateContext } from '../contexts/context'
import themeSettingsColors from '../utils/theme-settings-colors'

function ThemeSettings() {
  const { setIsSettings, theme, setTheme, color, setColor } = useStateContext()

  const changeTheme = (e) => {
    setTheme(e.target.value)
    localStorage.setItem('theme', e.target.value)
  }

  const changeColor = (color) => {
    setColor(color)
    localStorage.setItem('color', color)
  }

  return (
    <article className="w-screen fixed top-0 right-0 bg-half-transparent z-50">
      <div className="h-screen float-right dark:bg-secondary-dark-bg bg-light-gray dark:text-white text-slate-900 w-72 p-5">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Settings</p>

          <TooltipComponent>
            <button
              type="button"
              onClick={() => setIsSettings(false)}
              className="text-xl p-3 rounded-full dark:hover:bg-light-gray dark:hover:text-slate-900 hover:bg-secondary-dark-bg hover:text-white transition-all"
            >
              <MdOutlineCancel />
            </button>
          </TooltipComponent>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <p className="font-semibold text-xl">Theme Options</p>

          <label className="flex items-center gap-3 text-md cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="light"
              onChange={changeTheme}
              checked={theme === 'light'}
            />
            Light
          </label>

          <label className="flex items-center gap-3 text-md cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="dark"
              onChange={changeTheme}
              checked={theme === 'dark'}
            />
            Dark
          </label>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <p className="font-semibold text-xl">Theme Colors</p>

          <div className="flex gap-3 items-center flex-wrap">
            {themeSettingsColors?.length > 0 &&
              themeSettingsColors.map((item, i) => (
                <TooltipComponent
                  key={i}
                  content={item.name.toUpperCase()}
                  position="BottomCenter"
                >
                  <button
                    type="button"
                    onClick={() => changeColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
                  >
                    <BsCheck
                      className={`text-2xl text-white ${
                        color === item.color ? 'block' : 'hidden'
                      }`}
                    />
                  </button>
                </TooltipComponent>
              ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ThemeSettings
