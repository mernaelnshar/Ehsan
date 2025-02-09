import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import email from '../../assets/icon/email.png';
import lock from '../../assets/icon/lock.png';
import wrong from '../../assets/icon/wrong.png';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
const ForgetPassword = () => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    // فتح المودال
    const handleShow = () => setShow(true);

    // غلق المودال
    const handleClose = () => setShow(false);
    return (
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <div className="login-container " dir='rtl'>
                <h2 className="login-title">تحديث كلمة المرور</h2>
                <Form className="login-form text-center">
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col className='Col'>
                            <img src={email} className='emailIcon' alt="Email Icon" />
                            <Form.Control type="email" placeholder="email@example.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col className='Col'>
                            <img src={lock} className='passwordIcon' alt="Password Icon" />
                            <Form.Control type="password" placeholder="أدخل كلمة المرور الجديده" autoComplete="current-password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col className='Col'>
                            <img src={lock} className='passwordIcon' alt="Password Icon" />
                            <Form.Control type="password" placeholder="تأكيد كلمة المرور الجديده" autoComplete="current-password" />
                        </Col>
                    </Form.Group>



                    <Form.Group className='d-flex justify-content-between'>
                        <Button onClick={() => {
                            navigate('/');  // التوجيه إلى الصفحة الرئيسية
                            handleShow();   // عرض المودال
                        }} className="Registration-btn w-100 ms-5">
                            حفظ
                        </Button>
                        <Button onClick={() => navigate('/Login')} type="submit" className="back-btn w-100">
                            رجوع
                        </Button>
                    </Form.Group>

                    {/* مودال البريد الإلكتروني غير صحيح */}

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header >
                            <Modal.Title>خطأ في البريد الإلكتروني</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={wrong} alt='wrong' className='mb-3' />
                            <p>بريدك الإلكتروني غير صحيح. جرب بريدًا إلكترونيًا آخر أو قم بالتسجيل.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                حسنا
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </Form>


            </div>
        </div>
    );
};

export default ForgetPassword;
