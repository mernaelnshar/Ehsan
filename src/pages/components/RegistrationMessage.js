import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import photoDone from "../../assets/icon/done.png";
import "../../styles/RegistrationMessage.css";
import logo from "../../assets/image/logo.png";
import logouticon from "../../assets/icon/logout.png";

const RegistrationMessage = () => {
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
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className="logouticon" alt="logout icon" />
                </Link>
                <img src={logo} className="logoicon" alt="logo icon" />
            </div>

            <div className="d-flex justify-content-center" dir="rtl">
                <Card className="Registration-container text-center shadow-lg p-4 register-card">
                    <Card.Body>
                        <h2 className="Registration-title mb-3">رسالة التسجيل</h2>
                        <img src={photoDone} alt="photoDone" className="photoDone" />
                        <p className="Registration-text mb-4">
                            تم إنشاء حساب المستخدم ويمكن الدخول عليه عن طريق البريد الإلكتروني
                            أو الرقم القومي وكلمة المرور أدناه.
                        </p>

                        <Form.Group className="p-4 d-block border rounded bg-light align-items-center">
                            <h5 className="mb-3 text-end">بيانات تسجيل الدخول</h5>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label fw-bold text-end w-100">
                                    البريد الإلكتروني
                                </Form.Label>
                                {userData && (
                                    <Form.Control type="text" value={userData.email} disabled />
                                )}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="form-label fw-bold text-end w-100">
                                    كلمة المرور
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
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
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
                                تسجيل
                            </Button>
                            <Button
                                onClick={() => navigate("/TermsConfirmationForm")}
                                type="button"
                                className="back-btn"
                            >
                                رجوع
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default RegistrationMessage;
