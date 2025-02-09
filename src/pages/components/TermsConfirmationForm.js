import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../../styles/TermsConfirmationForm.css'; // استيراد ملف الستايل
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
const TermsConfirmationForm = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checked) {
            // التوجيه إلى صفحة /RegistrationMessage
            navigate('/RegistrationMessage');
        } else {
            alert('يجب الموافقة على الشروط والأحكام قبل المتابعة.');
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
        <div className="terms-container mt-4" dir="rtl">
            <h2 className="terms-title">التأكيد</h2>
            <Form onSubmit={handleSubmit} className="terms-form">
                <p className="terms-text">
                    إن نص Lorem Ipsum هو ببساطة نص وهمي يستخدم في صناعة الطباعة والتنضيد.
                    وقد كان نص Lorem Ipsum النص الوهمي القياسي في هذه الصناعة منذ القرن السادس عشر،
                    عندما قام طابع مجهول بأخذ مجموعة من الحروف وخلطها لعمل كتاب عينات الحروف.
                    وقد نجا النص ليس فقط من خمسة قرون، بل وأيضًا من القفزة إلى التنضيد الإلكتروني، وظل دون تغيير جوهري.
                    وقد انتشر في الستينيات مع إصدار أوراق Letraset التي تحتوي على مقاطع من نص Lorem Ipsum،
                    ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker.
                </p>
                <Form.Group controlId="termsCheckbox" className="terms-checkbox">
                    <Form.Check
                        type="checkbox"
                        label="أوافق على الشروط والأحكام"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                </Form.Group>
                <Form.Group className='d-flex justify-content-between'>
                    <Button type="submit" className="terms-btn" disabled={!checked}>
                        تأكيد
                    </Button>
                    <Button onClick={() => navigate('/RegisterForm')} type="button" className="back-btn">
                        رجوع
                    </Button>
                    
                </Form.Group>

            </Form>

            
        </div>
        </div>
    );
};

export default TermsConfirmationForm;
