import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/RegisterForm.css';
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import { LanguageContext } from '../../context/LanguageContext';
const texts = {
    registerTitle: { en: "Create a New Account", ar: "إنشاء حساب جديد" },
    personalInfo: { en: "Personal Information", ar: "المعلومات الشخصية" },
    firstName: { en: "Enter First Name", ar: "أدخل الاسم الأول" },
    fatherName: { en: "Enter Father's Name", ar: "أدخل اسم الأب" },
    grandfatherName: { en: "Enter Grandfather's Name", ar: "أدخل اسم الجد" },
    lastName: { en: "Enter Last Name", ar: "أدخل اسم العائلة" },
    nationality: { en: "Select Nationality", ar: "اختر الجنسية" },
    dateOfBirth: { en: "Enter Date of Birth", ar: "أدخل تاريخ الميلاد" },
    gender: { en: "Gender", ar: "الجنس" },
    male: { en: "Male", ar: "ذكر" },
    female: { en: "Female", ar: "أنثى" },
    contactInfo: { en: "Contact Information", ar: "معلومات الاتصال" },
    phoneNumber: { en: "Enter Phone Number", ar: "أدخل رقم الهاتف" },
    email: { en: "Enter Email", ar: "أدخل البريد الإلكتروني" },
    idInfo: { en: "Identity Information", ar: "معلومات الهوية" },
    idNumber: { en: "Enter ID Number", ar: "أدخل رقم الهوية" },
    accountInfo: { en: "Account Information", ar: "معلومات الحساب" },
    password: { en: "Enter Password", ar: "أدخل كلمة المرور" },
    confirmPassword: { en: "Re-enter Password", ar: "أعد إدخال كلمة المرور" },
    save: { en: "Save", ar: "حفظ" },
    errorRequired: { en: "This field is required", ar: "هذا الحقل مطلوب" },
    errorIdNumber: { en: "ID number must be between 8 and 18 digits", ar: "رقم الهوية يجب أن يكون بين 8 و 18 رقمًا" },
    errorPhoneNumber: { en: "Phone number must include country code and at least 8 digits", ar: "يجب أن يحتوي رقم الهاتف على رمز الدولة و8 أرقام على الأقل" },
    errorPassword: { en: "Password must be at least 6 characters, contain a number and a letter, and have no special symbols", ar: "يجب أن تكون كلمة المرور 6 خانات على الأقل، تحتوي على رقم وحرف واحد على الأقل، وبدون رموز خاصة" },
    errorConfirmPassword: { en: "Passwords do not match", ar: "كلمتا المرور غير متطابقتين" },
    emailExists: { en: "Email is already registered, please use another email", ar: "البريد الإلكتروني مسجل بالفعل، الرجاء استخدام بريد إلكتروني آخر." },
    registerError: { en: "An error occurred during registration, please try again", ar: "حدث خطأ أثناء التسجيل، الرجاء المحاولة مرة أخرى." }
};

const textsnationalEn = [
    { en: "Afghan", ar: "أفغاني" },
    { en: "Albanian", ar: "ألباني" },
    { en: "Algerian", ar: "جزائري" },
    { en: "American", ar: "أمريكي" },
    { en: "Andorran", ar: "أندوري" },
    { en: "Angolan", ar: "أنغولي" },
    { en: "Antiguan and Barbudan", ar: "أنتيغوي وبربودي" },
    { en: "Argentine", ar: "أرجنتيني" },
    { en: "Armenian", ar: "أرميني" },
    { en: "Australian", ar: "أسترالي" },
    { en: "Austrian", ar: "نمساوي" },
    { en: "Azerbaijani", ar: "أذربيجاني" },
    { en: "Bahamian", ar: "باهامي" },
    { en: "Bahraini", ar: "بحريني" },
    { en: "Bangladeshi", ar: "بنغلاديشي" },
    { en: "Barbadian", ar: "باربادوسي" },
    { en: "Belarusian", ar: "بيلاروسي" },
    { en: "Belgian", ar: "بلجيكي" },
    { en: "Belizean", ar: "بليزي" },
    { en: "Beninese", ar: "بنيني" },
    { en: "Bhutanese", ar: "بوتاني" },
    { en: "Bolivian", ar: "بوليفي" },
    { en: "Bosnian", ar: "بوسني" },
    { en: "Botswanan", ar: "بوتسواني" },
    { en: "Brazilian", ar: "برازيلي" },
    { en: "Bruneian", ar: "بروني" },
    { en: "Bulgarian", ar: "بلغاري" },
    { en: "Burkinabe", ar: "بوركيني" },
    { en: "Burmese", ar: "بورمي" },
    { en: "Burundian", ar: "بوروندي" },
    { en: "Cambodian", ar: "كمبودي" },
    { en: "Cameroonian", ar: "كاميروني" },
    { en: "Canadian", ar: "كندي" },
    { en: "Cape Verdean", ar: "كاب فيردي" },
    { en: "Central African", ar: "أفريقي مركزي" },
    { en: "Chadian", ar: "تشادي" },
    { en: "Chilean", ar: "تشيلي" },
    { en: "Chinese", ar: "صيني" },
    { en: "Colombian", ar: "كولومبي" },
    { en: "Comorian", ar: "قمري" },
    { en: "Congolese", ar: "كونغولي" },
    { en: "Costa Rican", ar: "كوستاريكي" },
    { en: "Croatian", ar: "كرواتي" },
    { en: "Cuban", ar: "كوبي" },
    { en: "Cypriot", ar: "قبرصي" },
    { en: "Czech", ar: "تشيكي" },
    { en: "Danish", ar: "دنماركي" },
    { en: "Djiboutian", ar: "جيبوتي" },
    { en: "Dominican", ar: "دومينيكاني" },
    { en: "Dutch", ar: "هولندي" },
    { en: "Ecuadorean", ar: "إكوادوري" },
    { en: "Egyptian", ar: "مصري" },
    { en: "Equatorial Guinean", ar: "غيني استوائي" },
    { en: "Eritrean", ar: "إريتري" },
    { en: "Estonian", ar: "إستوني" },
    { en: "Ethiopian", ar: "إثيوبي" },
    { en: "Fijian", ar: "فيجي" },
    { en: "Filipino", ar: "فلبيني" },
    { en: "Finnish", ar: "فنلندي" },
    { en: "French", ar: "فرنسي" },
    { en: "Gabonese", ar: "غابوني" },
    { en: "Gambian", ar: "غامبي" },
    { en: "Georgian", ar: "جورجي" },
    { en: "German", ar: "ألماني" },
    { en: "Ghanaian", ar: "غاني" },
    { en: "Greek", ar: "يوناني" },
    { en: "Grenadian", ar: "غرينادي" },
    { en: "Guatemalan", ar: "غواتيمالي" },
    { en: "Guinean", ar: "غيني" },
    { en: "Guinea-Bissauan", ar: "غيني بيساوي" },
    { en: "Guyanese", ar: "غوياني" },
    { en: "Haitian", ar: "هايتي" },
    { en: "Honduran", ar: "هندوراسي" },
    { en: "Hungarian", ar: "مجري" },
    { en: "Icelandic", ar: "آيسلندي" },
    { en: "Indian", ar: "هندي" },
    { en: "Indonesian", ar: "إندونيسي" },
    { en: "Iranian", ar: "إيراني" },
    { en: "Iraqi", ar: "عراقي" },
    { en: "Irish", ar: "إيرلندي" },
    { en: "Israeli", ar: "إسرائيلي" },
    { en: "Italian", ar: "إيطالي" },
    { en: "Ivorian", ar: "إيفواري" },
    { en: "Jamaican", ar: "جامايكي" },
    { en: "Japanese", ar: "ياباني" },
    { en: "Jordanian", ar: "أردني" },
    { en: "Kazakh", ar: "كازاخستاني" },
    { en: "Kenyan", ar: "كيني" },
    { en: "Kiribati", ar: "كيريباتي" },
    { en: "Kuwaiti", ar: "كويتي" },
    { en: "Kyrgyz", ar: "قيرغيزي" },
    { en: "Laotian", ar: "لاوسي" },
    { en: "Latvian", ar: "لاتفي" },
    { en: "Lebanese", ar: "لبناني" }
];
const textsnationalAr = textsnationalEn.slice().sort((a, b) => a.ar.localeCompare(b.ar, 'ar'));



const RegisterForm = () => {
    const { language } = useContext(LanguageContext);
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
                newErrors[key] = texts.errorRequired[language];
            }
        });

        if (formData.idNumber && (formData.idNumber.length < 8 || formData.idNumber.length > 18 || !/^[0-9]+$/.test(formData.idNumber))) {
            newErrors.idNumber = texts.errorIdNumber[language];
        }

        if (formData.phoneNumber && !/^\+?[0-9]{8,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = texts.errorPhoneNumber[language];
        }

        if (formData.password && (!/^\w{6,}$/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[a-zA-Z]/.test(formData.password))) {
            newErrors.password = texts.errorPassword[language];
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = texts.errorConfirmPassword[language];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            localStorage.setItem('pendingUser', JSON.stringify(formData));
            navigate('/TermsConfirmationForm');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setFirebaseError(texts.emailExists[language]);
            } else {
                setFirebaseError(texts.registerError[language]);
            }
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

            <div className="register-container" >
                <h2 className="register-title">{texts.registerTitle[language]}</h2>
                {firebaseError && <Alert variant="danger">{firebaseError}</Alert>}
                <Form className="register-form" onSubmit={handleRegister}>
                    <h4>{texts.personalInfo[language]}</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="firstName" placeholder={texts.firstName[language]} value={formData.firstName} onChange={handleChange} />
                                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="fatherName" placeholder={texts.fatherName[language]} value={formData.fatherName} onChange={handleChange} />
                                {errors.fatherName && <p className="text-danger">{errors.fatherName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="text" name="grandfatherName" placeholder={texts.grandfatherName[language]} value={formData.grandfatherName} onChange={handleChange} />
                                {errors.grandfatherName && <p className="text-danger">{errors.grandfatherName}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formLastName">
                            <Col>
                                <Form.Control type="text" name="lastName" placeholder={texts.lastName[language]} value={formData.lastName} onChange={handleChange} />
                                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formNationality">
                            <Col>
                                <Form.Select name="nationality" value={formData.nationality} onChange={handleChange}>
                                    <option value="">{language === "ar" ? "اختر الجنسية" : "Select Nationality"}</option>
                                    {(language === "ar" ? textsnationalAr : textsnationalEn).map((nationality, index) => (
                                        <option key={index} value={nationality.en}>
                                            {nationality[language]}
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
                                label={texts.male[language]}
                                name="gender"
                                value="Male"
                                className='gender mx-3'
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label={texts.female[language]}
                                name="gender"
                                value="Female"
                                className='gender mx-3'
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            {errors.gender && <p className="text-danger">{errors.gender}</p>}
                        </Col>
                    </Form.Group>


                    <h4>{texts.contactInfo[language]}</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formPhoneNumber">
                            <Col>
                                <Form.Control type="text" name="phoneNumber" placeholder={texts.phoneNumber[language]} value={formData.phoneNumber} onChange={handleChange} />
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3" controlId="formEmail">
                            <Col>
                                <Form.Control type="email" name="email" placeholder={texts.email[language]} value={formData.email} onChange={handleChange} />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <h4> {texts.idInfo[language]}</h4>
                    <Form.Group as={Row} className="mb-3 mx-3">
                        <Col sm="4">
                            <Form.Control type="text" name="idNumber" placeholder={texts.idNumber[language]} value={formData.idNumber} onChange={handleChange} />
                            {errors.idNumber && <p className="text-danger">{errors.idNumber}</p>}
                        </Col>
                    </Form.Group>

                    <h4>{texts.accountInfo[language]}</h4>
                    <Form.Group className='d-flex'>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="password" name="password" placeholder={texts.password[language]} value={formData.password} onChange={handleChange} />
                                {errors.password && <p className="text-danger">{errors.password}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mx-3">
                            <Col>
                                <Form.Control type="password" name="confirmPassword" placeholder={texts.confirmPassword[language]} value={formData.confirmPassword} onChange={handleChange} />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Row} className="d-flex justify-content-center">
                        <Button className="submit-btn" type="submit">{texts.save[language]}</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
