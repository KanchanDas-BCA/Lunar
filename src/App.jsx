import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


/*---- All lazy import so that page download in client system only when redirected -----*/
//pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

//courseGroup
const GetCourseGroup = lazy(() => import('./components/courseGroup/GetCourseGroup'));

//documentGroup
const GetDocumentGroup = lazy(() => import('./components/documentGroup/GetDocumentGroup'));

//roles
const GetRole = lazy(() => import('./components/role/GetRole'));

//certificate Type
const GetCertificateType = lazy(() => import('./components/certificateType/GetCertificateType'));

//Fee topic
const GetFeeTopic = lazy(() => import('./components/feeTopic/GetFeeTopic'));

//Person Category
const GetPersonCategory = lazy(() => import('./components/personCategory/GetPersonCategory'));

//Office
const GetOffice = lazy(() => import('./components/office/GetOffice'));

//Person 
const GetPerson = lazy(() => import('./components/person/GetPerson'));

//Setting
const Setting = lazy(() => import('./components/Setting'));

// Layouts
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Error = lazy(() => import('./Error'));

import { ToastContainer } from 'react-toastify';
import LazyLoader from './utils/LazyLoader';
import { AuthProvider } from './contexts/AuthContext';
import AuthWrapper from './routes/AuthWrapper';
import AcademicSession from './components/AcademicSession/GetAcademic';

function App() {
  return (
    <>
      <Router basename='/Lunar'>
        <AuthProvider>
          <ToastContainer position='top-right' autoClose={3000} /> {/* Global Toast Container */}
          <Routes>
            <Route exact path='/' element={
              <Suspense fallback={<LazyLoader />}>
                <AuthWrapper>
                  <DashboardLayout />
                </AuthWrapper>
              </Suspense>
            }>
              <Route index element={<Dashboard />} />
              <Route path='courseGroup' element={<GetCourseGroup />} />
              <Route path='documentGroup/' element={<GetDocumentGroup />} />
              <Route path='role' element={<GetRole />} />
              <Route path='certificateType' element={<GetCertificateType />}/>
              <Route path='feeTopic' element={<GetFeeTopic />} />
              <Route path='personCategory' element={<GetPersonCategory />} />
              <Route path='office' element={<GetOffice />}  />
              <Route path='person' element={<GetPerson />}  />
              <Route path='AcademicSession' element={<AcademicSession/>}/>
              
              {/* For Setting */}
              <Route path='setting/'>
                <Route index element={<Setting />} />
              </Route>
            </Route>  
            {/* ----- Dashboard Layout End------------*/}

            {/* For login */}
            <Route exact path='/login' element={
              <Suspense fallback={<LazyLoader />} >
                <Login />
              </Suspense>
            } />

            {/* For Error */}
            <Route path='*' element={<Error />} />

          </Routes>

        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
