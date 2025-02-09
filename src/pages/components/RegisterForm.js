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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                                <Form.Control type="text" name="nationality" placeholder="أدخل الجنسية" value={formData.nationality} onChange={handleChange} />
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
                        <Col className=' d-flex mx-4'>
                            <Form.Check type="radio" label="ذكر" name="gender" value="ذكر" className='gender mx-3' checked={formData.gender === "ذكر"} onChange={handleChange} />
                            <Form.Check type="radio" label="أنثى" name="gender" value="أنثى" className='gender mx-3' checked={formData.gender === "أنثى"} onChange={handleChange} />
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
