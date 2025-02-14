import React, { useEffect, useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import photoDone from "../../assets/icon/done.png";
import "../../styles/RegistrationMessage.css";
import logo from "../../assets/image/logo.png";
import logouticon from "../../assets/icon/logout.png";
import { LanguageContext } from '../../context/LanguageContext';
const texts = {
    registrationMessage: {
        ar: "رسالة التسجيل",
        en: "Registration Message"
    },
    registrationSuccess: {
        ar: "تم إنشاء حساب المستخدم ويمكن الدخول عليه عن طريق البريد الإلكتروني أو الرقم القومي وكلمة المرور أدناه.",
        en: "The user account has been created, and you can log in using the email or national ID and the password below."
    },
    loginData: {
        ar: "بيانات تسجيل الدخول",
        en: "Login Information"
    },
    email: {
        ar: "البريد الإلكتروني",
        en: "Email"
    },
    password: {
        ar: "كلمة المرور",
        en: "Password"
    },
    register: {
        ar: "تسجيل",
        en: "Register"
    },
    back: {
        ar: "رجوع",
        en: "Back"
    }
};
const RegistrationMessage = () => {
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("registeredUser");
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else {
            navigate("/RegisterForm");
        }
    }, [navigate]);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className="logouticon" alt="logout icon" />
                </Link>
                <img src={logo} className="logoicon" alt="logo icon" />
            </div>

            <div className="d-flex justify-content-center" dir="rtl">
                <Card className="Registration-container text-center shadow-lg p-4 register-card">
                    <Card.Body>
                        <h2 className="Registration-title mb-3">{texts.registrationMessage[language]} </h2>
                        <img src={photoDone} alt="photoDone" className="photoDone" />
                        <p className="Registration-text mb-4">
                        {texts.registrationSuccess[language]}
                        </p>

                        <Form.Group className="p-4 d-block border rounded bg-light align-items-center">
                            <h5 className="mb-3">{texts.loginData[language]}</h5>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">
                                {texts.email[language]}
                                </Form.Label>
                                {userData && (
                                    <Form.Control type="text" value={userData.email} disabled />
                                )}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="form-label">
                                {texts.password[language]}
                                </Form.Label>
                                <div className="position-relative">
                                    {userData && (
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            value={userData.password}
                                            disabled
                                        />
                                    )}
                                    <div
                                        onClick={togglePassword}
                                        className="togglePassword position-absolute  top-50 translate-middle-y"
                                        style={{ cursor: "pointer" }}
                                        
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between">
                            <Button
                                onClick={() => navigate("/UserTypeForm")}
                                type="button"
                                className="Registration-btn"
                            >
                                {texts.register[language]}
                            </Button>
                            <Button
                                onClick={() => navigate("/TermsConfirmationForm")}
                                type="button"
                                className="back-btn"
                            >
                                {texts.back[language]}
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default RegistrationMessage;
