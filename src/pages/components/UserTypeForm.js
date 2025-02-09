import { Form } from 'react-bootstrap';
import '../../styles/UserTypeForm.css';
import teacher from '../../assets/icon/teacher.png';
import student from '../../assets/icon/student.png';
import { Link } from "react-router-dom";
import logo from '../../assets/image/logo.png';
import logouticon from '../../assets/icon/logout.png';
const UserTypeForm = () => {
    return (
        <div>
            <div className="Navbar">
                <Link to="/" className="link">
                    <img src={logouticon} className='logouticon' alt='logout icon' />
                </Link>
                <img src={logo} className='logoicon' alt='logo icon' />
            </div>
        <Form className="user-type-form">
            <Form.Group className="mb-4 d-flex">

                {/* زر الاختيار: معلم */}
                <Link to="contact" smooth={true} duration={500} className="link">
                    <div className="form-check user-type-option">
                        <img src={teacher} alt="teacher" className="user-type-image" />
                        <h1 className="user-type-title">معلم</h1>
                    </div>
                </Link>

                {/* زر الاختيار: طالب */}
                <Link to="contact" smooth={true} duration={500} className="link">
                    <div className="form-check user-type-option">
                        <img src={student} alt="student" className="user-type-image" />
                        <h1 className="user-type-title">طالب</h1>
                    </div>
                </Link>

            </Form.Group>
        </Form>
        </div>
    );
};

export default UserTypeForm;
