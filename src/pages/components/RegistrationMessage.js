import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import photoDone from '../../assets/icon/done.png'
import '../../styles/RegistrationMessage.css'
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
const RegistrationMessage = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false); // حالة لإظهار أو إخفاء الباسورد
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
        <div className=" d-flex justify-content-center " dir="rtl">
            <Card className="Registration-container text-center shadow-lg p-4 register-card">
                <Card.Body>
                    <h2 className="Registration-title  mb-3 ">رسالة التسجيل</h2>
                    <img src={photoDone} alt='photoDone' className='photoDone' />
                    <p className="Registration-text mb-4">
                        تم إنشاء حساب المستخدم ويمكن الدخول عليه عن طريق البريد الإلكتروني أو الرقم القومي وكلمة المرور أدناه والاستفادة من كافة المميزات المتوفرة في التطبيق ويمكنك الدخول إلى حسابك وإكمال التسجيل كطالب أو معلم
                    </p>

                    <Form.Group className='p-4 d-block border rounded  bg-light align-items-center'>
                        <h5 className="mb-3 text-end">بيانات تسجيل الدخول</h5>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Label className="form-label fw-bold">البريد الإلكتروني</Form.Label>
                            <Form.Control type="text" value="email@gmail.com" disabled />
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex register-card">
                            <Form.Label className="form-label fw-bold">كلمة المرور</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type={showPassword ? "text" : "password"} // تغيير نوع المدخل بناءً على حالة إظهار الباسورد
                                    value="12345678" // يمكنك استبدالها بالقيمة الحقيقية إذا كنت تستخدمها
                                    disabled
                                    className="form-control"
                                />
                                <div
                                    onClick={togglePassword}
                                    className="position-absolute end-0 top-50 translate-middle-y me-5"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* تغيير الأيقونة حسب حالة إظهار الباسورد */}
                                </div>
                            </div>
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className='d-flex justify-content-between'>
                        <Button onClick={() => navigate('/UserTypeForm')}  type="submit" className="Registration-btn">
                            تسجيل
                        </Button>
                        <Button onClick={() => navigate('/TermsConfirmationForm')} type="submit" className="back-btn">
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
