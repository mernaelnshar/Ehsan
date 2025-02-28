import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext  } from 'react';
import { Link , useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import emailIcon  from '../../assets/icon/email.png';
import lockIcon  from '../../assets/icon/lock.png';
import '../../styles/LoginForm.css'; // استيراد ملف الستايل
import logo from '../../assets/image/logo.png';
import logoutIcon from '../../assets/icon/logout.png';
import '../../firebase/firebaseConfig'; // تأكد من استيراد ملف إعدادات Firebase
import { LanguageContext } from '../../context/LanguageContext';
import{auth} from "../../firebase/firebaseConfig";
const texts = {
    ar: {
        loginTitle: "تسجيل الدخول",
        emailPlaceholder: "email@example.com",
        passwordPlaceholder: "أدخل كلمة المرور",
        fillAllFields: "يرجى ملء جميع الحقول!",
        userNotFound: "المستخدم غير موجود، يرجى التأكد من البريد الإلكتروني.",
        wrongPassword: "كلمة المرور غير صحيحة، حاول مرة أخرى.",
        errorOccurred: "حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقًا.",
        register: "تسجيل مستخدم",
        forgotPassword: "نسيت كلمة المرور؟",
        submit: "تسجيل الدخول"
    },
    en: {
        loginTitle: "Login",
        emailPlaceholder: "email@example.com",
        passwordPlaceholder: "Enter your password",
        fillAllFields: "Please fill in all fields!",
        userNotFound: "User not found, please check your email.",
        wrongPassword: "Incorrect password, please try again.",
        errorOccurred: "An error occurred during login, please try again later.",
        register: "Register",
        forgotPassword: "Forgot Password?",
        submit: "Login"
    }
};
const LoginForm = () => {
    const { language } = useContext(LanguageContext);
    const [emailValue, setEmailValue] = useState('');  // تخزين البريد الإلكتروني
    const [passwordValue, setPasswordValue] = useState('');  // تخزين كلمة المرور
    const [errorMessage, setErrorMessage] = useState('');  // لتخزين رسالة الخطأ
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValue || !passwordValue) {
            setErrorMessage(texts[language].fillAllFields);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, emailValue, passwordValue);
            alert("User logged in successfully");
            navigate('/Home');  // الانتقال للصفحة الرئيسية
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setErrorMessage(texts[language].userNotFound);
            } else if (error.code === 'auth/wrong-password') {
                setErrorMessage(texts[language].wrongPassword);
            } else {
                setErrorMessage(texts[language].errorOccurred);
            }
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logoutIcon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <div className="login-container" dir={language === "ar" ? "rtl" : "ltr"}>
                <h2 className="login-title">{texts[language].loginTitle}</h2>
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col className='Col'>
                            <img src={emailIcon} className='emailIcon' alt="Email Icon" />
                            <Form.Control 
                                type="email" 
                                placeholder={texts[language].emailPlaceholder} 
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)} 
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col className='Col'>
                            <img src={lockIcon} className='passwordIcon' alt="Password Icon" />
                            <Form.Control 
                                type="password" 
                                placeholder={texts[language].passwordPlaceholder} 
                                autoComplete="current-password" 
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)} 
                            />
                        </Col>
                    </Form.Group>

                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}

                    <div className="login-actions">
                        <Link to="/RegisterForm" className="register">{texts[language].register}</Link>
                        <Link to="/ForgetPassword" className="forgot-password">{texts[language].forgotPassword}</Link>
                    </div>

                    <Button className="submit-btn me-5" type="submit">
                        {texts[language].submit}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
