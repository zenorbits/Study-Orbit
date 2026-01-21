import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminMainBody from './AdminMainBody'
import Footer from '../components/Footer'
const AdminPage = () => {
  return (
    <div className='min-h-screen  overflow-x-hidden'>
        <AdminNavbar/>
        <AdminMainBody/>
        <Footer/>
    </div>
  )
}

export default AdminPage