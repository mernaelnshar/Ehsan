import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navLogin.css';
import DashboardLayout from "./pages/components/DashboardLayout";
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
function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App; 