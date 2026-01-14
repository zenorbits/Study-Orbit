import React, { useState } from 'react'
import RegisterPage from './AuthPages/RegisterPage'
import LoginPage from './AuthPages/LoginPage'

const App = () => {
  const [darkmode, setdarkmode] = useState(true);

  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  }

  return (
    <div className="min-h-screen font-mono items-center justify-center dark:bg-[#111] dark:text-white">
      {/* <RegisterPage darkmode={darkmode}/> */}
      <LoginPage/>
    </div>
  )
}

export default App