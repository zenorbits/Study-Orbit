import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './AuthPages/RegisterPage';
import LoginPage from './AuthPages/LoginPage';
import ParentAuthPage from './AuthPages/ParentAuthPage';
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import AdminPage from './Admin/AdminPage';
import TeacherPage from './teacher/TeacherPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import TeacherMainBody from './teacher/TeacherMainBody'
import TeacherBatchCreation from './teacher/batch(Teacher)/TeacherBatchCreation';
import ManageBatch from './teacher/batch(Teacher)/ManageBatch';
import AllTeacherBatch from './teacher/batch(Teacher)/AllTeacherBatch';

const App = () => {
  return (


    <div className="min-h-screen font-mono items-center justify-center bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* ✅ Only render ParentAuthPage for auth routes */}
        <Route path="/register" element={<ParentAuthPage><RegisterPage /></ParentAuthPage>} />
        <Route path="/login" element={<ParentAuthPage><LoginPage /></ParentAuthPage>} />
        <Route path='/admin' element={<AdminPage />} />


        <Route path='/teacher/*' element={<ProtectedRoutes allowedRoles={['teacher']}><TeacherPage /></ProtectedRoutes>}>
          <Route index element={<TeacherMainBody/>} />
          <Route path='createbatch' element={<TeacherBatchCreation />} />
          <Route path='managebatch' element={<ManageBatch/>} />
          <Route path='batch' element={<AllTeacherBatch/>} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />

    </div>
  );
};

export default App;