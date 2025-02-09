import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/RegisterForm.css'; // استيراد ملف الستايل
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
const RegisterForm = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
        <div className="register-container" dir='rtl'>
            <h2 className="register-title">إنشاء حساب جديد</h2>
            <Form className="register-form">
                <h4>المعلومات الشخصية</h4>
                <Form.Group className='d-flex'>
                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formFirstName">
                        <Col>
                            <Form.Control type="text" placeholder="أدخل الاسم الأول" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formFatherName">
                        <Col>
                            <Form.Control type="text" placeholder="أدخل اسم الأب" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formGrandfatherName">
                        <Col>
                            <Form.Control type="text" placeholder="أدخل اسم الجد" />
                        </Col>
                    </Form.Group>
                </Form.Group>




                <Form.Group className='d-flex'>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formLastName">

                        <Col>
                            <Form.Control type="text" placeholder="أدخل اسم العائلة" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formNationality">
                        <Col>
                            <Form.Control type="text" placeholder="أدخل الجنسية" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formDateOfBirth">

                        <Col>
                            <Form.Control type="date" />
                        </Col>
                    </Form.Group>


                </Form.Group>

                <Form.Group className="mb-3">
                    <Col className=' d-flex mx-4'>
                        <Form.Check type="radio" label="ذكر" name="gender" className='gender mx-3' />
                        <Form.Check type="radio" label="أنثى" name="gender" className='gender mx-3' />
                    </Col>
                </Form.Group>

                <h4>معلومات الاتصال</h4>
                <Form.Group className='d-flex' >
                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formPhoneNumber">
                        <Col >
                            <Form.Control type="text" placeholder="أدخل رقم الهاتف" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formEmail">

                        <Col>
                            <Form.Control type="email" placeholder="أدخل البريد الإلكتروني" />
                        </Col>
                    </Form.Group>
                </Form.Group>


                <h4>معلومات الهوية</h4>
                <Form.Group as={Row} className="mb-3 mx-3" controlId="formIDNumber">

                    <Col sm="4">
                        <Form.Control type="text" placeholder="أدخل رقم الهوية" />
                    </Col>
                </Form.Group>

                <h4>معلومات الحساب</h4>
                <Form.Group className='d-flex'>
                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formPassword">

                        <Col >
                            <Form.Control type="password" placeholder="أدخل كلمة المرور" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formConfirmPassword">

                        <Col >
                            <Form.Control type="password" placeholder="أعد إدخال كلمة المرور" />
                        </Col>
                    </Form.Group>
                    <Button  onClick={() => navigate('/TermsConfirmationForm')} className="submit-btn mx-5" type="submit">حفظ</Button>
                </Form.Group>

            </Form>
        </div>
        </div>
    );
};

export default RegisterForm;
