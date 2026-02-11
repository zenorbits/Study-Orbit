import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes';
import Lenis from '@studio-freight/lenis';
import EditProfileForm from './components/EditProfileForm';
import OTPPage from './components/OTPPage';

// ✅ Lazy load pages for performance
const RegisterPage = lazy(() => import('./AuthPages/RegisterPage'));
const LoginPage = lazy(() => import('./AuthPages/LoginPage'));
const ParentAuthPage = lazy(() => import('./AuthPages/ParentAuthPage'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const AdminPage = lazy(() => import('./admin/AdminPage'));
const TeacherPage = lazy(() => import('./teacher/TeacherPage'));
const TeacherMainBody = lazy(() => import('./teacher/TeacherMainBody'));
const TeacherBatchCreation = lazy(() => import('./teacher/batch(Teacher)/TeacherBatchCreation'));
const ManageBatch = lazy(() => import('./teacher/batch(Teacher)/ManageBatch'));
const AllTeacherBatch = lazy(() => import('./teacher/batch(Teacher)/AllTeacherBatch'));
const AdminMainBody = lazy(() => import('./admin/AdminMainBody'));
const PendingBatchPages = lazy(() => import('./admin/Batch(Admin)/PendingBatchPages'));
const StudentPage = lazy(() => import('./student/StudentPage'));
const StudentMainBody = lazy(() => import('./student/StudentMainBody'));
const BrowseBatch = lazy(() => import('./student/batch(Student)/BrowseBatch'));
const Mybatches = lazy(() => import('./student/batch(Student)/Mybatches'));
const ManageTeacher = lazy(() => import('./admin/ManageTeacher'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));

// ✅ Layout wrapper with Lenis smooth scroll
const Layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {

    };
  }, []);

  return (
    <div className="min-h-screen font-mono bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white relative">
      {children}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<ParentAuthPage><RegisterPage /></ParentAuthPage>} />
          <Route path="/login" element={<ParentAuthPage><LoginPage /></ParentAuthPage>} />
          <Route path="/otpinp" element={<ParentAuthPage><OTPPage /></ParentAuthPage>} />

          {/* Teacher Routes */}
          <Route path="/teacher/*" element={
            <ProtectedRoutes allowedRoles={['teacher']}>
              <TeacherPage />
            </ProtectedRoutes>
          }>
            <Route index element={<TeacherMainBody />} />
            <Route path="createbatch" element={<TeacherBatchCreation />} />
            <Route path="managebatch" element={<ManageBatch />} />
            <Route path="batch" element={<AllTeacherBatch />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="editprofile" element={<EditProfileForm />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoutes>
          }>
            <Route index element={<AdminMainBody />} />
            <Route path="pendingbatch" element={<PendingBatchPages />} />
            <Route path="managebatch" element={<ManageBatch />} />
            <Route path="createbatch" element={<TeacherBatchCreation />} />
            <Route path="batch" element={<AllTeacherBatch />} />
            <Route path="teachers" element={<ManageTeacher />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="editprofile" element={<EditProfileForm />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student/*" element={
            <ProtectedRoutes allowedRoles={['student']}>
              <StudentPage />
            </ProtectedRoutes>
          }>
            <Route index element={<StudentMainBody />} />
            <Route path="join-batch" element={<BrowseBatch />} />
            <Route path="batches" element={<Mybatches />} />
            <Route path="batch" element={<AllTeacherBatch />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="editprofile" element={<EditProfileForm />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;