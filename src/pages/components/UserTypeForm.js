import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import '../../styles/UserTypeForm.css';
import teacher from '../../assets/icon/teacher.png';
import student from '../../assets/icon/student.png';
import { useNavigate, Link } from "react-router-dom";
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
import { LanguageContext } from '../../context/LanguageContext';

const texts ={
    teacher:{
        ar: "معلم",
        en: "Teacher"
    },
    student:{
        ar:"طالب",
        en:"Student"
    }
};
const UserTypeForm = () => {
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();
    return (
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
            <Form className="user-type-form">
                <Form.Group className="mb-4 d-flex">

                    {/* زر الاختيار: معلم */}
                    
                        <div className="form-check user-type-option" onClick={() => navigate("/register-teacher")}>
                            <img src={teacher} alt="teacher" className="user-type-image" />
                            <h1 className="user-type-title">{texts.teacher[language]}</h1>
                        </div>
                    

                    {/* زر الاختيار: طالب */}
                    
                        <div className="form-check user-type-option" onClick={() => navigate("/register-student")}>
                            <img src={student} alt="student" className="user-type-image" />
                            <h1 className="user-type-title">{texts.student[language]}</h1>
                        </div>
                    


                </Form.Group>
            </Form>
        </div>
    );
};

export default UserTypeForm;
