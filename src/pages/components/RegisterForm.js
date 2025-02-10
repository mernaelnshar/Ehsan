import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/RegisterForm.css';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';


const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        fatherName: '',
        grandfatherName: '',
        lastName: '',
        nationality: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        idNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [firebaseError, setFirebaseError] = useState(null);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "dateOfBirth" && value.includes("/")) {
            const [day, month, year] = value.split("/");
            value = `${year}-${month}-${day}`;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));

    };

    const validate = () => {
        let newErrors = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                newErrors[key] = "هذا الحقل مطلوب";
            }
        });

        if (formData.idNumber && (formData.idNumber.length < 8 || formData.idNumber.length > 18 || !/^[0-9]+$/.test(formData.idNumber))) {
            newErrors.idNumber = "رقم الهوية يجب أن يكون بين 8 و 18 رقمًا";
        }

        if (formData.phoneNumber && !/^\+?[0-9]{8,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "يجب أن يحتوي رقم الهاتف على رمز الدولة و8 أرقام على الأقل";
        }

        if (formData.password && (!/^\w{6,}$/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[a-zA-Z]/.test(formData.password))) {
            newErrors.password = "يجب أن تكون كلمة المرور 6 خانات على الأقل، تحتوي على رقم وحرف واحد على الأقل، وبدون رموز خاصة";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;


        try {
            // جرب إنشاء مستخدم جديد بالبريد الإلكتروني وكلمة المرور

            // إذا نجح التسجيل، احفظ البيانات مؤقتًا وانتقل لصفحة تأكيد الشروط
            localStorage.setItem('pendingUser', JSON.stringify(formData));
            navigate('/TermsConfirmationForm');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setFirebaseError("البريد الإلكتروني مسجل بالفعل، الرجاء استخدام بريد إلكتروني آخر.");
            } else {
                setFirebaseError("حدث خطأ أثناء التسجيل، الرجاء المحاولة مرة أخرى.");
            }
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

            <div className="register-container" dir='rtl'>
                <h2 className="register-title">إنشاء حساب جديد</h2>
                {firebaseError && <Alert variant="danger">{firebaseError}</Alert>}
                <Form className="register-form" onSubmit={handleRegister}>
                    <h4>المعلومات الشخصية</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="firstName" placeholder="أدخل الاسم الأول" value={formData.firstName} onChange={handleChange} />
                                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="fatherName" placeholder="أدخل اسم الأب" value={formData.fatherName} onChange={handleChange} />
                                {errors.fatherName && <p className="text-danger">{errors.fatherName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="grandfatherName" placeholder="أدخل اسم الجد" value={formData.grandfatherName} onChange={handleChange} />
                                {errors.grandfatherName && <p className="text-danger">{errors.grandfatherName}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formLastName">
                            <Col>
                                <Form.Control type="text" name="lastName" placeholder="أدخل اسم العائلة" value={formData.lastName} onChange={handleChange} />
                                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formNationality">
                            <Col>
                                <Form.Select name="nationality" value={formData.nationality} onChange={handleChange}>
                                    <option value="">اختر الجنسية</option>
                                    {[
                                        { "en": "Afghan", "ar": "أفغاني" },
                                        { "en": "Albanian", "ar": "ألباني" },
                                        { "en": "Algerian", "ar": "جزائري" },
                                        { "en": "American", "ar": "أمريكي" },
                                        { "en": "Andorran", "ar": "أندوري" },
                                        { "en": "Angolan", "ar": "أنغولي" },
                                        { "en": "Antiguan and Barbudan", "ar": "أنتيغوي وبربودي" },
                                        { "en": "Argentine", "ar": "أرجنتيني" },
                                        { "en": "Armenian", "ar": "أرميني" },
                                        { "en": "Australian", "ar": "أسترالي" },
                                        { "en": "Austrian", "ar": "نمساوي" },
                                        { "en": "Azerbaijani", "ar": "أذربيجاني" },
                                        { "en": "Bahamian", "ar": "باهامي" },
                                        { "en": "Bahraini", "ar": "بحريني" },
                                        { "en": "Bangladeshi", "ar": "بنغلاديشي" },
                                        { "en": "Barbadian", "ar": "باربادوسي" },
                                        { "en": "Belarusian", "ar": "بيلاروسي" },
                                        { "en": "Belgian", "ar": "بلجيكي" },
                                        { "en": "Belizean", "ar": "بليزي" },
                                        { "en": "Beninese", "ar": "بنيني" },
                                        { "en": "Bhutanese", "ar": "بوتاني" },
                                        { "en": "Bolivian", "ar": "بوليفي" },
                                        { "en": "Bosnian", "ar": "بوسني" },
                                        { "en": "Botswanan", "ar": "بوتسواني" },
                                        { "en": "Brazilian", "ar": "برازيلي" },
                                        { "en": "Bruneian", "ar": "بروني" },
                                        { "en": "Bulgarian", "ar": "بلغاري" },
                                        { "en": "Burkinabe", "ar": "بوركيني" },
                                        { "en": "Burmese", "ar": "بورمي" },
                                        { "en": "Burundian", "ar": "بوروندي" },
                                        { "en": "Cambodian", "ar": "كمبودي" },
                                        { "en": "Cameroonian", "ar": "كاميروني" },
                                        { "en": "Canadian", "ar": "كندي" },
                                        { "en": "Cape Verdean", "ar": "كاب فيردي" },
                                        { "en": "Central African", "ar": "أفريقي مركزي" },
                                        { "en": "Chadian", "ar": "تشادي" },
                                        { "en": "Chilean", "ar": "تشيلي" },
                                        { "en": "Chinese", "ar": "صيني" },
                                        { "en": "Colombian", "ar": "كولومبي" },
                                        { "en": "Comorian", "ar": "قمري" },
                                        { "en": "Congolese", "ar": "كونغولي" },
                                        { "en": "Costa Rican", "ar": "كوستاريكي" },
                                        { "en": "Croatian", "ar": "كرواتي" },
                                        { "en": "Cuban", "ar": "كوبي" },
                                        { "en": "Cypriot", "ar": "قبرصي" },
                                        { "en": "Czech", "ar": "تشيكي" },
                                        { "en": "Danish", "ar": "دنماركي" },
                                        { "en": "Djiboutian", "ar": "جيبوتي" },
                                        { "en": "Dominican", "ar": "دومينيكاني" },
                                        { "en": "Dutch", "ar": "هولندي" },
                                        { "en": "Ecuadorean", "ar": "إكوادوري" },
                                        { "en": "Egyptian", "ar": "مصري" },
                                        { "en": "Salvadoran", "ar": "سلفادوري" },
                                        { "en": "Equatorial Guinean", "ar": "غيني استوائي" },
                                        { "en": "Eritrean", "ar": "إريتري" },
                                        { "en": "Estonian", "ar": "إستوني" },
                                        { "en": "Ethiopian", "ar": "إثيوبي" },
                                        { "en": "Fijian", "ar": "فيجي" },
                                        { "en": "Filipino", "ar": "فلبيني" },
                                        { "en": "Finnish", "ar": "فنلندي" },
                                        { "en": "French", "ar": "فرنسي" },
                                        { "en": "Gabonese", "ar": "غابوني" },
                                        { "en": "Gambian", "ar": "غامبي" },
                                        { "en": "Georgian", "ar": "جورجي" },
                                        { "en": "German", "ar": "ألماني" },
                                        { "en": "Ghanaian", "ar": "غاني" },
                                        { "en": "Greek", "ar": "يوناني" },
                                        { "en": "Grenadian", "ar": "غرينادي" },
                                        { "en": "Guatemalan", "ar": "غواتيمالي" },
                                        { "en": "Guinean", "ar": "غيني" },
                                        { "en": "Guinea-Bissauan", "ar": "غيني بيساوي" },
                                        { "en": "Guyanese", "ar": "غوياني" },
                                        { "en": "Haitian", "ar": "هايتي" },
                                        { "en": "Honduran", "ar": "هندوراسي" },
                                        { "en": "Hungarian", "ar": "مجري" },
                                        { "en": "Icelandic", "ar": "آيسلندي" },
                                        { "en": "Indian", "ar": "هندي" },
                                        { "en": "Indonesian", "ar": "إندونيسي" },
                                        { "en": "Iranian", "ar": "إيراني" },
                                        { "en": "Iraqi", "ar": "عراقي" },
                                        { "en": "Irish", "ar": "إيرلندي" },
                                        { "en": "Israeli", "ar": "إسرائيلي" },
                                        { "en": "Italian", "ar": "إيطالي" },
                                        { "en": "Ivorian", "ar": "إيفواري" },
                                        { "en": "Jamaican", "ar": "جامايكي" },
                                        { "en": "Japanese", "ar": "ياباني" },
                                        { "en": "Jordanian", "ar": "أردني" },
                                        { "en": "Kazakh", "ar": "كازاخستاني" },
                                        { "en": "Kenyan", "ar": "كيني" },
                                        { "en": "Kiribati", "ar": "كيريباتي" },
                                        { "en": "Kuwaiti", "ar": "كويتي" },
                                        { "en": "Kyrgyz", "ar": "قيرغيزي" },
                                        { "en": "Laotian", "ar": "لاوسي" },
                                        { "en": "Latvian", "ar": "لاتفي" },
                                        { "en": "Lebanese", "ar": "لبناني" },
                                        { "en": "Lesotho", "ar": "ليسوتي" },
                                        { "en": "Liberian", "ar": "ليبيري" },
                                        { "en": "Libyan", "ar": "ليبي" },
                                        { "en": "Liechtensteiner", "ar": "ليختنشتايني" },
                                        { "en": "Lithuanian", "ar": "ليتواني" },
                                        { "en": "Luxembourgish", "ar": "لوكسمبورغي" },
                                        { "en": "Madagascan", "ar": "مدغشقري" },
                                        { "en": "Malawian", "ar": "مالاوي" },
                                        { "en": "Malaysian", "ar": "ماليزي" },
                                        { "en": "Maldivian", "ar": "مالديفي" },
                                        { "en": "Malian", "ar": "مالي" },
                                        { "en": "Maltese", "ar": "مالطي" },
                                        { "en": "Marshallese", "ar": "مارشالي" },
                                        { "en": "Mauritanian", "ar": "موريتاني" },
                                        { "en": "Mauritian", "ar": "موريشي" },
                                        { "en": "Mexican", "ar": "مكسيكي" },
                                        { "en": "Micronesian", "ar": "ميكرونيزي" },
                                        { "en": "Moldovan", "ar": "مولدوفي" },
                                        { "en": "Monacan", "ar": "مونيكي" },
                                        { "en": "Mongolian", "ar": "منغولي" },
                                        { "en": "Montenegrin", "ar": "مونتينيغري" },
                                        { "en": "Moroccan", "ar": "مغربي" },
                                        { "en": "Mozambican", "ar": "موزمبيقي" },
                                        { "en": "Namibian", "ar": "ناميبي" },
                                        { "en": "Nauruan", "ar": "نوري" },
                                        { "en": "Nepalese", "ar": "نيبالي" },
                                        { "en": "New Zealander", "ar": "نيوزيلندي" },
                                        { "en": "Nicaraguan", "ar": "نيكاراغوي" },
                                        { "en": "Nigerien", "ar": "نيجيري" },
                                        { "en": "Nigerian", "ar": "نيجيري" },
                                        { "en": "North Korean", "ar": "كوري شمالي" },
                                        { "en": "Norwegian", "ar": "نرويجي" },
                                        { "en": "Omani", "ar": "عماني" },
                                        { "en": "Pakistani", "ar": "باكستاني" },
                                        { "en": "Palauan", "ar": "بالاوي" },
                                        { "en": "Palestinian", "ar": "فلسطيني" },
                                        { "en": "Panamanian", "ar": "بنمي" },
                                        { "en": "Papua New Guinean", "ar": "بابوا غيني جديد" },
                                        { "en": "Paraguayan", "ar": "باراغوياني" },
                                        { "en": "Peruvian", "ar": "بيروفي" },
                                        { "en": "Polish", "ar": "بولندي" },
                                        { "en": "Portuguese", "ar": "برتغالي" },
                                        { "en": "Qatari", "ar": "قطري" },
                                        { "en": "Romanian", "ar": "روماني" },
                                        { "en": "Russian", "ar": "روسي" },
                                        { "en": "Rwandan", "ar": "رواندي" },
                                        { "en": "Saint Lucian", "ar": "سانت لوسياني" },
                                        { "en": "Samoan", "ar": "ساموي" },
                                        { "en": "San Marino", "ar": "سان ماريني" },
                                        { "en": "Saudi", "ar": "سعودي" },
                                        { "en": "Senegalese", "ar": "سنغالي" },
                                        { "en": "Serbian", "ar": "صربي" },
                                        { "en": "Seychellois", "ar": "سيشيلي" },
                                        { "en": "Sierra Leonean", "ar": "سيراليوني" },
                                        { "en": "Singaporean", "ar": "سنغافوري" },
                                        { "en": "Slovak", "ar": "سلوفاكي" },
                                        { "en": "Slovenian", "ar": "سلوفيني" },
                                        { "en": "Solomon Islander", "ar": "سولوموني" },
                                        { "en": "Somali", "ar": "صومالي" },
                                        { "en": "South African", "ar": "جنوب أفريقي" },
                                        { "en": "South Korean", "ar": "كوري جنوبي" },
                                        { "en": "Spanish", "ar": "إسباني" },
                                        { "en": "Sri Lankan", "ar": "سريلانكي" },
                                        { "en": "Sudanese", "ar": "سوداني" },
                                        { "en": "Surinamer", "ar": "سورينامي" },
                                        { "en": "Swazi", "ar": "سوازي" },
                                        { "en": "Swedish", "ar": "سويدي" },
                                        { "en": "Swiss", "ar": "سويسري" },
                                        { "en": "Syrian", "ar": "سوري" },
                                        { "en": "Taiwanese", "ar": "تايواني" },
                                        { "en": "Tajik", "ar": "طاجيكي" },
                                        { "en": "Tanzanian", "ar": "تنزاني" },
                                        { "en": "Thai", "ar": "تايلندي" },
                                        { "en": "Togolese", "ar": "توغولي" },
                                        { "en": "Tongan", "ar": "تونغي" },
                                        { "en": "Trinidadian", "ar": "ترينيدادي" },
                                        { "en": "Tunisian", "ar": "تونسي" },
                                        { "en": "Turkish", "ar": "تركي" },
                                        { "en": "Turkmen", "ar": "تركماني" },
                                        { "en": "Tuvaluan", "ar": "توفالي" },
                                        { "en": "Ugandan", "ar": "أوغندي" },
                                        { "en": "Ukrainian", "ar": "أوكراني" },
                                        { "en": "Uruguayan", "ar": "أوروغوياني" },
                                        { "en": "Uzbek", "ar": "أوزبكي" },
                                        { "en": "Vanuatu", "ar": "فانواتي" },
                                        { "en": "Venezuelan", "ar": "فنزويلي" },
                                        { "en": "Vietnamese", "ar": "فيتنامي" },
                                        { "en": "Yemeni", "ar": "يمني" },
                                        { "en": "Zambian", "ar": "زامبي" },
                                        { "en": "Zimbabwean", "ar": "زيمبابوي" }
                                    ].map((nationality, index) => (
                                        <option key={index} value={nationality.en}>
                                            {nationality.ar}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.nationality && <p className="text-danger">{errors.nationality}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formDateOfBirth">
                            <Col>
                                <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                                {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth}</p>}
                            </Col>
                        </Form.Group>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mx-3" controlId="formGender">
                        <Col className='d-flex mx-4'>
                            <Form.Check
                                type="radio"
                                label="ذكر"
                                name="gender"
                                value="Male"
                                className='gender mx-3'
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="أنثى"
                                name="gender"
                                value="Female"
                                className='gender mx-3'
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            {errors.gender && <p className="text-danger">{errors.gender}</p>}
                        </Col>
                    </Form.Group>


                    <h4>معلومات الاتصال</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formPhoneNumber">
                            <Col>
                                <Form.Control type="text" name="phoneNumber" placeholder="أدخل رقم الهاتف" value={formData.phoneNumber} onChange={handleChange} />
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formEmail">
                            <Col>
                                <Form.Control type="email" name="email" placeholder="أدخل البريد الإلكتروني" value={formData.email} onChange={handleChange} />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <h4>معلومات الهوية</h4>
                    <Form.Group as={Row} className="mb-3 mx-3">
                        <Col sm="4">
                            <Form.Control type="text" name="idNumber" placeholder="أدخل رقم الهوية" value={formData.idNumber} onChange={handleChange} />
                            {errors.idNumber && <p className="text-danger">{errors.idNumber}</p>}
                        </Col>
                    </Form.Group>

                    <h4>معلومات الحساب</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="password" name="password" placeholder="أدخل كلمة المرور" value={formData.password} onChange={handleChange} />
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="password" name="confirmPassword" placeholder="أعد إدخال كلمة المرور" value={formData.confirmPassword} onChange={handleChange} />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Row} className="d-flex justify-content-center">
                        <Button className="submit-btn" type="submit">حفظ</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
