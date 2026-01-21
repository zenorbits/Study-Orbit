import React from 'react'
import AdminNavbar from './AdminNavbar'

import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const AdminPage = () => {
  return (
    <div className='min-h-screen  overflow-x-hidden'>
        <AdminNavbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AdminPage