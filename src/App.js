import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navLogin.css';
import { LanguageProvider } from './context/LanguageContext';
import { auth } from './firebase/firebaseConfig';

// Layouts
import DashboardLayout from './pages/components/DashboardLayout';
import DashboardLayoutHome from './pages/components/DashboardLayoutHome';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/components/LoginForm';
import RegisterForm from './pages/components/RegisterForm';
import TermsConfirmationForm from './pages/components/TermsConfirmationForm';
import RegistrationMessage from './pages/components/RegistrationMessage';
import UserTypeForm from './pages/components/UserTypeForm';
import ForgetPassword from './pages/components/ForgetPassword';
import Home from './pages/components/Home';
import RegisterTeacher from './pages/components/RegisterTeacher';
import RegisterStudent from './pages/components/RegisterStudent';
import Profile from './pages/components/Profile';
import StudentsList from './pages/components/StudentsList';
import StudentEvaluation from './pages/components/StudentEvaluation';
import AddNewHifzReview from './pages/components/AddNewHifzReview';
import StudentRecords from './pages/components/StudentRecords';
import ProfileStudent from './pages/components/ProfileStudent';
import ProfileTeacher from './pages/components/ProfileTeacher';
import EducationalPlan from './pages/components/EducationalPlan';

import { loadQuranJson } from './services/quranJsonService';
function App() {
  const [user, setUser] = useState(null);
  const [isQuranLoading, setIsQuranLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    loadQuranJson().then(() => setIsQuranLoading(false)); // تحميل بيانات القرآن
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsUserLoading(false); // انتهاء تحميل المستخدم
    });

    return () => unsubscribe();
  }, []);

  if (isQuranLoading || isUserLoading) {
    return <div>📖 جاري تحميل البيانات...</div>; // رسالة تحميل موحدة
  }


  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={user ? <Navigate to='/home' /> : <Login />} />
          <Route path='/RegisterForm' element={<RegisterForm />} />
          <Route path='/TermsConfirmationForm' element={<TermsConfirmationForm />} />
          <Route path='/RegistrationMessage' element={<RegistrationMessage />} />
          <Route path='/UserTypeForm' element={<UserTypeForm />} />
          <Route path='/ForgetPassword' element={<ForgetPassword />} />

          {/* مسارات تحتاج إلى تسجيل دخول */}
          {user && (
            <>
              <Route element={<DashboardLayout />}>
                <Route path='/Home' element={<Home />} />
                <Route path='/register-teacher' element={<RegisterTeacher />} />
                <Route path='/register-student' element={<RegisterStudent />} />
                <Route path='/Profile' element={<Profile />} />
              </Route>

              <Route element={<DashboardLayoutHome />}>
                <Route path='/StudentsList' element={<StudentsList />} />
                <Route path='/StudentEvaluation' element={<StudentEvaluation />} />
                <Route path='/AddNewHifzReview' element={<AddNewHifzReview />} />
                <Route path='/StudentRecords' element={<StudentRecords />} />
                <Route path='/ProfileStudent' element={<ProfileStudent />} />
                <Route path='/ProfileTeacher' element={<ProfileTeacher />} />
                <Route path='/EducationalPlan' element={<EducationalPlan />} />
              </Route>
            </>
          )}
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
