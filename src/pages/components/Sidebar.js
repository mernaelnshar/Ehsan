import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChalkboardTeacher, FaUserGraduate, FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import logo from '../../assets/image/logo.png'; // تأكد من وضع مسار الصورة الصحيح
import '../../styles/Sidebar.css'; // ملف الستايل
import { LanguageContext } from '../../context/LanguageContext'; // استيراد الكونتكست

const Sidebar = () => {
    const location = useLocation(); // تحديد الصفحة الحالية
    const { language, switchLanguage } = useContext(LanguageContext);
    const isArabic = language === "ar";

    async function handleLogout() {
    alert(language === "ar" ? "تم تسجيل الخروج" : "User logged out successfully");
    window.location.href = "/";
}
    return (
        <div className={`sidebar ${isArabic ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
            {/* اللوجو */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            {/* الروابط */}
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/Home" className={`nav-link ${location.pathname === "/Home" ? "active-link" : ""}`}>
                        <FaHome className="icon" /> {language === "ar" ? "الصفحة الرئيسية" : "Home"}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/register-teacher" className={`nav-link ${location.pathname === "/register-teacher" ? "active-link" : ""}`}>
                        <FaChalkboardTeacher className="icon" /> {language === "ar" ? "تسجيل كمعلم" : "Register as Teacher"}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/register-student" className={`nav-link ${location.pathname === "/register-student" ? "active-link" : ""}`}>
                        <FaUserGraduate className="icon" /> {language === "ar" ? "تسجيل كطالب" : "Register as Student"}
                    </Nav.Link>
                </Nav.Item>

                {/* زر تغيير اللغة */}
                <Nav.Item>
                    <Nav.Link onClick={() => switchLanguage(language === "ar" ? "en" : "ar")} className="nav-link">
                        <FaGlobe className="icon" /> {language === "ar" ? "English" : "العربية"}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to="/profile" className={`nav-link ${location.pathname === "/profile" ? "active-link" : ""}`}>
                        <FaUser className="icon" /> {language === "ar" ? "الصفحة الشخصية" : "Profile"}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link}  className="nav-link logout" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" /> {language === "ar" ? "تسجيل خروج" : "Logout"}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;
