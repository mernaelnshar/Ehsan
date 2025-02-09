import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import emailphoto from '../../assets/image/send-mail (1) 1.png';
import insta from '../../assets/icon/insta.png';
import xxx from '../../assets/icon/x.png';
import whats from '../../assets/icon/whats.png';

function ContactUs() {
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
        <div className='ContactUs' id='contact'>
            <div className='photo'>
                <img src={emailphoto} alt="email" />
                <div className='icons'>
                    <a href='#'><img src={insta} alt="instagram" /></a>
                    <a href='#'><img src={xxx} alt="xxx" /></a>
                    <a href='#'><img src={whats} alt="whatsapp" /></a>
                </div>
            </div>

            <Container className="contact-container" dir='rtl'>
                <div className="contact-box">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="contact-title">تواصل معنا بسهولة</h2>

                        {/* اسم المستخدم */}
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>الاسم</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="أدخل اسمك"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* البريد الإلكتروني */}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>البريد الإلكتروني</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Text muted>لن نشارك بريدك الإلكتروني مع أي شخص آخر.</Form.Text>
                        </Form.Group>

                        {/* الرسالة */}
                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Label>الرسالة</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="اكتب رسالتك هنا..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="submitbtn" id='Login'>
                            إرسال
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default ContactUs;
