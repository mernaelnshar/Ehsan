import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChalkboardTeacher, FaUserGraduate, FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import logo from '../../assets/image/logo.png'; // تأكد من وضع مسار الصورة الصحيح
import '../../styles/SidebarHome.css'; // ملف الستايل
import { LanguageContext } from '../../context/LanguageContext'; // استيراد الكونتكست

const SidebarHome = () => {
    const location = useLocation(); // تحديد الصفحة الحالية
    const { language, switchLanguage } = useContext(LanguageContext);
    const isArabic = language === "ar";

    function handleLogout() {
        alert("تم تسجيل الخروج");
        window.location.href = "/";
    }

    return (
        <div className={`sidebarHome ${isArabic ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
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
                    <Nav.Link onClick={() => switchLanguage(language === "ar" ? "en" : "ar")} className="nav-link">
                        <FaGlobe className="icon" />
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/profile" className={`nav-link ${location.pathname === "/profile" ? "active-link" : ""}`}>
                        <FaUser className="icon" />
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} className="nav-link logout" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" />
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SidebarHome;
