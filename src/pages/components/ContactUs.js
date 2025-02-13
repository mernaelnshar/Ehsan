import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailphoto from '../../assets/image/send-mail (1) 1.png';
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6"; // استيراد الأيقونات


function ContactUs({ language }) {
    const texts = {
        ar: {
            title: "اتصل بنا",
            name: "الاسم",
            namePlaceholder: "أدخل اسمك",
            email: "البريد الإلكتروني",
            emailPlaceholder: "example@email.com",
            emailNote: "لن نشارك بريدك الإلكتروني مع أي شخص آخر.",
            message: "الرسالة",
            messagePlaceholder: "اكتب رسالتك هنا...",
            submit: "إرسال",
        },
        en: {
            title: "Contact Us",
            name: "Name",
            namePlaceholder: "Enter your name",
            email: "Email",
            emailPlaceholder: "example@email.com",
            emailNote: "We will not share your email with anyone else.",
            message: "Message",
            messagePlaceholder: "Write your message here...",
            submit: "Send",
        }
    };

    // تعريف الحالات
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // دالة لمعالجة إرسال الفورم
    const handleSubmit = (event) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة
        alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    };

    return (
        <div className="contact-us text-center" id="contact">
            <Container>
                <Row className="align-items-center justify-content-center">
                    {/* نموذج الاتصال */}
                    <Col lg={6}>
                        <div className="contact-box">
                            <Form onSubmit={handleSubmit}>
                                <h2 className="contact-title">{texts[language].title}</h2>

                                {/* اسم المستخدم */}
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>{texts[language].name}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={texts[language].namePlaceholder}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* البريد الإلكتروني */}
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>{texts[language].email}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder={texts[language].emailPlaceholder}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Form.Text muted>{texts[language].emailNote}</Form.Text>
                                </Form.Group>

                                {/* الرسالة */}
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>{texts[language].message}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder={texts[language].messagePlaceholder}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" className="submitbtn">
                                    {texts[language].submit}
                                </Button>
                            </Form>

                        </div>
                    </Col>
                    {/* الصورة والأيقونات */}
                    <Col lg={5} className="text-center">
                        <div className="photo">
                            <img src={emailphoto} alt="email" className="email-photo" />
                            <div className="icons">
                                <a href="#" className="icon">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="icon">
                                    <FaXTwitter />
                                </a>
                                <a href="#" className="icon">
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ContactUs;
