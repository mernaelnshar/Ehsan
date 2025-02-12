import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChalkboardTeacher, FaUserGraduate, FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import logo from '../../assets/image/logo.png'; // تأكد من وضع مسار الصورة الصحيح
import '../../styles/SidebarHome.css'; // ملف الستايل

const SidebarHome = () => {
    const location = useLocation(); // تحديد الصفحة الحالية

    return (
        <div className="sidebarHome" dir='rtl'>
            {/* اللوجو */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            {/* الروابط */}
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/Home" className={`nav-link ${location.pathname === "/Home" ? "active-link" : ""}`}>
                        <FaHome className="icon" /> 
                    </Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link as={Link} to="/register-teacher" className={`nav-link ${location.pathname === "/register-teacher" ? "active-link" : ""}`}>
                        <FaChalkboardTeacher className="icon" />  
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/register-student" className={`nav-link ${location.pathname === "/register-student" ? "active-link" : ""}`}>
                        <FaUserGraduate className="icon" />  
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/" className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}>
                        <FaGlobe className="icon" />  
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/profile" className={`nav-link ${location.pathname === "/profile" ? "active-link" : ""}`}>
                        <FaUser className="icon" />  
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/" className="nav-link logout">
                        <FaSignOutAlt className="icon" />  
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SidebarHome;
