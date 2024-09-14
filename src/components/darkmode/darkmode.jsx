import React, { createContext, useState } from 'react'

export const UseDarkMode = createContext()

export function DarkModeProvider({children}) {

    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

  return (
    <UseDarkMode.Provider value={{darkMode, toggleDarkMode}}>
        {children}
    </UseDarkMode.Provider>
  )
}
