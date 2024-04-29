/* eslint-disable react/prop-types */

import { useState } from 'react'
import { StateContext } from './context'

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

export const StateProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false)
  const [isSettings, setIsSettings] = useState(false)
  const [theme, setTheme] = useState(localStorage?.getItem('theme') ?? 'light')
  const [color, setColor] = useState(
    localStorage?.getItem('color') ?? '#03C9D7'
  )
  const [iconNavState, setIconNavState] = useState(initialState)

  return (
    <StateContext.Provider
      value={{
        isSidebar,
        setIsSidebar,
        isSettings,
        setIsSettings,
        theme,
        setTheme,
        color,
        setColor,
        iconNavState,
        setIconNavState,
        // iconNavbarClicked,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
