import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import '../../styles/TermsConfirmationForm.css';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const TermsConfirmationForm = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    const [formData, setFormData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('pendingUser');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        } else {
            navigate('/RegisterForm');
        }
    }, [navigate]);

    const handleConfirm = async () => {
        if (!formData) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                firstName: formData.firstName,
                fatherName: formData.fatherName,
                grandfatherName: formData.grandfatherName,
                lastName: formData.lastName,
                nationality: formData.nationality,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                idNumber: formData.idNumber,
                uid: user.uid
            });

            localStorage.setItem('registeredUser', JSON.stringify({
                email: formData.email,
                password: formData.password
            }));

            localStorage.removeItem('pendingUser');
            navigate('/RegistrationMessage');
        } catch (error) {
            setError("حدث خطأ أثناء التسجيل، الرجاء المحاولة مرة أخرى.");
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
                <Form className="terms-form">
                    <p className="terms-text">
                        - يقر المستخدم بأن أي معلومات يقدمها عبر المنصة التعليمية هي معلومات حقيقية، كما يتحمل المسؤولية الكاملة عن محتوى أي معلومات أو وثائق يقدمها من خلال المنصة.
                    </p>
                    <p className="terms-text">
                        - يُمنع على المستخدم التسجيل في المنصة أو الدخول إليها منتحلًا اسم شخص آخر.
                    </p>
                    <p className="terms-text">
                        - لا يجوز للمستخدم السماح للآخرين باستخدام حسابه لأي سبب من الأسباب.
                    </p>
                    <p className="terms-text">
                        - يقر المستخدم بأن دخوله إلى المنصة واستخدامه لها سيكون لأغراض مشروعة فقط، ويلتزم بعدم استخدام المنصة أو أي من المعلومات أو الخدمات أو الأدوات المتوفرة عليها للقيام بأي عمل يُعد مخالفة أو جريمة.
                    </p>
                    <p className="terms-text">
                        - في حالة حدوث أي مخالفة للتعليمات أعلاه، يحق لإدارة تقنية المعلومات اتخاذ الإجراءات المناسبة، بما في ذلك إلغاء الحساب نهائيًا.
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
                        <Button onClick={handleConfirm} className="terms-btn" disabled={!checked}>
                            تأكيد
                        </Button>
                        <Button onClick={() => navigate('/RegisterForm')} type="button" className="back-btn">
                            رجوع
                        </Button>
                    </Form.Group>
                </Form>
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default TermsConfirmationForm;
