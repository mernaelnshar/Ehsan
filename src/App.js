import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navLogin.css';
import DashboardLayout from "./pages/components/DashboardLayout";
import DashboardLayoutHome from "./pages/components/DashboardLayoutHome";
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

import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/TermsConfirmationForm" element={<TermsConfirmationForm />} />
          <Route path="/RegistrationMessage" element={<RegistrationMessage />} />
          <Route path="/UserTypeForm" element={<UserTypeForm />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />


          <Route element={<DashboardLayout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/register-teacher" element={<RegisterTeacher />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/profile" element={<Profile />} />
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
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App; 