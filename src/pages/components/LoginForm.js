import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import email from '../../assets/icon/email.png';
import lock from '../../assets/icon/lock.png';
import '../../styles/LoginForm.css'; // استيراد ملف الستايل
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import '../../firebase/firebaseConfig'; // تأكد من استيراد ملف إعدادات Firebase

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');  // تخزين البريد الإلكتروني
    const [passwordValue, setPasswordValue] = useState('');  // تخزين كلمة المرور
    const [errorMessage, setErrorMessage] = useState('');  // لتخزين رسالة الخطأ
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValue || !passwordValue) {
            setErrorMessage('يرجى ملء جميع الحقول!');
            return;
        }

        try {
            // await signInWithEmailAndPassword(auth, emailValue, passwordValue);
            // setErrorMessage('');
            navigate('/Home');  // الانتقال للصفحة الرئيسية
        } catch (error) {
            // if (error.code === 'auth/user-not-found') {
            //     setErrorMessage('المستخدم غير موجود، يرجى التأكد من البريد الإلكتروني.');
            // } else if (error.code === 'auth/wrong-password') {
            //     setErrorMessage('كلمة المرور غير صحيحة، حاول مرة أخرى.');
            // } else {
            //     setErrorMessage('حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقًا.');
            // }
        }
    };

    return (
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <div className="login-container" dir='rtl'>
                <h2 className="login-title">تسجيل الدخول</h2>
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col className='Col'>
                            <img src={email} className='emailIcon' alt="Email Icon" />
                            <Form.Control 
                                type="email" 
                                placeholder="email@example.com" 
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)} 
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col className='Col'>
                            <img src={lock} className='passwordIcon' alt="Password Icon" />
                            <Form.Control 
                                type="password" 
                                placeholder="أدخل كلمة المرور" 
                                autoComplete="current-password" 
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)} 
                            />
                        </Col>
                    </Form.Group>

                    {/* عرض رسالة الخطأ إذا كانت موجودة */}
                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}

                    <div className="login-actions">
                        <Link to="/RegisterForm" className="register">تسجيل مستخدم</Link>
                        <Link to="/ForgetPassword" className="forgot-password">نسيت كلمة المرور؟</Link>
                    </div>

                    <Button className="submit-btn me-5" type="submit">تسجيل الدخول</Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
