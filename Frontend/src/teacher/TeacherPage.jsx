import React from 'react'
import TeacherNavbar from './TeacherNavbar'
import TeacherMainBody from './TeacherMainBody'
import Footer from '../components/Footer'

const TeacherPage = () => {
  return (
    <div className='overflow-x-hidden h-full'>
        <TeacherNavbar/>
        <TeacherMainBody/>
        <Footer/>
    </div>
  )
}

export default TeacherPage