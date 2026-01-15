import React, { useEffect, useState } from 'react'
import RegisterPage from './AuthPages/RegisterPage'
import LoginPage from './AuthPages/LoginPage'
import ParentAuthPage from './AuthPages/PArentAuthPage'


const App = () => {
  return (

    <div className="min-h-screen font-mono items-center justify-center bg-[#111] text-white relative">

      <ParentAuthPage />

    </div>
  )
}

export default App