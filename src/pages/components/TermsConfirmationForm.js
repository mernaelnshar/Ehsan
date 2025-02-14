import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import '../../styles/TermsConfirmationForm.css';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { LanguageContext } from '../../context/LanguageContext';

const texts = {
    confirmation: {
        ar: "التأكيد",
        en: "Confirmation"
    },
    terms: [
        {
            ar: "يقر المستخدم بأن أي معلومات يقدمها عبر المنصة التعليمية هي معلومات حقيقية، كما يتحمل المسؤولية الكاملة عن محتوى أي معلومات أو وثائق يقدمها من خلال المنصة.",
            en: "The user acknowledges that any information provided through the educational platform is accurate and that they bear full responsibility for the content of any information or documents submitted through the platform."
        },
        {
            ar: "يُمنع على المستخدم التسجيل في المنصة أو الدخول إليها منتحلًا اسم شخص آخر.",
            en: "The user is prohibited from registering on the platform or accessing it under someone else's name."
        },
        {
            ar: "لا يجوز للمستخدم السماح للآخرين باستخدام حسابه لأي سبب من الأسباب.",
            en: "The user must not allow others to use their account for any reason."
        },
        {
            ar: "يقر المستخدم بأن دخوله إلى المنصة واستخدامه لها سيكون لأغراض مشروعة فقط، ويلتزم بعدم استخدام المنصة أو أي من المعلومات أو الخدمات أو الأدوات المتوفرة عليها للقيام بأي عمل يُعد مخالفة أو جريمة.",
            en: "The user acknowledges that their access to and use of the platform will be for legitimate purposes only and agrees not to use the platform, its information, services, or tools to engage in any unlawful activities."
        },
        {
            ar: "في حالة حدوث أي مخالفة للتعليمات أعلاه، يحق لإدارة تقنية المعلومات اتخاذ الإجراءات المناسبة، بما في ذلك إلغاء الحساب نهائيًا.",
            en: "In case of any violation of the above instructions, the IT administration has the right to take appropriate actions, including permanently deleting the account."
        }
    ],
    agreeTerms: {
        ar: "أوافق على الشروط والأحكام",
        en: "I agree to the terms and conditions"
    },
    confirm: {
        ar: "تأكيد",
        en: "Confirm"
    },
    back: {
        ar: "رجوع",
        en: "Back"
    },
    error: {
        ar: "حدث خطأ أثناء التسجيل، الرجاء المحاولة مرة أخرى.",
        en: "An error occurred during registration. Please try again."
    }
};



const TermsConfirmationForm = () => {
    const { language } = useContext(LanguageContext);
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

            });

            localStorage.setItem('registeredUser', JSON.stringify({
                email: formData.email,
                password: formData.password
            }));

            localStorage.removeItem('pendingUser');
            navigate('/RegistrationMessage');
        } catch (error) {
            setError(texts.error[language]);
        }
    };

    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <div className="terms-container mt-4" dir="rtl">
                <h2 className="terms-title">{texts.confirmation[language]}</h2>
                <Form className="terms-form">
                    {texts.terms.map((term, index) => (
                        <p key={index} className="terms-text">
                            {term[language]}
                        </p>
                    ))}

                    <Form.Group controlId="termsCheckbox" className="terms-checkbox">
                        <Form.Check
                            type="checkbox"
                            label={texts.agreeTerms[language]}
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                    </Form.Group>

                    <Form.Group className='d-flex justify-content-between'>
                        <Button onClick={handleConfirm} className="terms-btn" disabled={!checked}>
                        {texts.confirm[language]}
                        </Button>
                        <Button onClick={() => navigate('/RegisterForm')} type="button" className="back-btn">
                        {texts.back[language]}
                        </Button>
                    </Form.Group>
                </Form>
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default TermsConfirmationForm;
