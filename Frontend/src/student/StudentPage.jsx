import React from 'react'
import StudentNavbar from './StudentNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const StudentPage = () => {
  return (
    <div>
        <StudentNavbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default StudentPage