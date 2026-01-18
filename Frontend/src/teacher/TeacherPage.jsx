import React from 'react';
import TeacherNavbar from './TeacherNavbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const TeacherPage = () => {
  return (
    <div className='overflow-x-hidden h-full'>
      <TeacherNavbar />
      <Outlet />   {/* Nested routes will render here */}
      <Footer />
    </div>
  );
};

export default TeacherPage;