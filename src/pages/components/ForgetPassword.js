import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import email from '../../assets/icon/email.png';
import lock from '../../assets/icon/lock.png';
import wrong from '../../assets/icon/wrong.png';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import { LanguageContext } from '../../context/LanguageContext';

const texts = {
    en: {
        updatePassword: "Update Password",
        emailPlaceholder: "email@example.com",
        newPassword: "Enter new password",
        confirmPassword: "Confirm new password",
        save: "Save",
        back: "Back",
        errorTitle: "Email Error",
        errorMessage: "Your email is incorrect. Try another email or sign up.",
        ok: "OK"
    },
    ar: {
        updatePassword: "تحديث كلمة المرور",
        emailPlaceholder: "email@example.com",
        newPassword: "أدخل كلمة المرور الجديدة",
        confirmPassword: "تأكيد كلمة المرور الجديدة",
        save: "حفظ",
        back: "رجوع",
        errorTitle: "خطأ في البريد الإلكتروني",
        errorMessage: "بريدك الإلكتروني غير صحيح. جرب بريدًا إلكترونيًا آخر أو قم بالتسجيل.",
        ok: "حسنا"
    }
};

const ForgetPassword = () => {
    const { language } = useContext(LanguageContext);
    const t = texts[language];
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <div className="login-container">
                <h2 className="login-title">{t.updatePassword}</h2>
                <Form className="login-form text-center">
                    <Form.Group as={Row} className="mb-3">
                        <Col className='Col'>
                            <img src={email} className='emailIcon' alt="Email Icon" />
                            <Form.Control type="email" placeholder={t.emailPlaceholder} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col className='Col'>
                            <img src={lock} className='passwordIcon' alt="Password Icon" />
                            <Form.Control type="password" placeholder={t.newPassword} autoComplete="current-password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col className='Col'>
                            <img src={lock} className='passwordIcon' alt="Password Icon" />
                            <Form.Control type="password" placeholder={t.confirmPassword} autoComplete="current-password" />
                        </Col>
                    </Form.Group>

                    <Form.Group className='d-flex justify-content-between '>
                        <Button onClick={() => {
                            navigate('/');
                            handleShow();
                        }} className="Registration-btn w-100 m-2">
                            {t.save}
                        </Button>
                        <Button onClick={() => navigate('/Login')} className="back-btn w-100 m-2">
                            {t.back}
                        </Button>
                    </Form.Group>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>{t.errorTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={wrong} alt='wrong' className='mb-3' />
                            <p>{t.errorMessage}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>{t.ok}</Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;
