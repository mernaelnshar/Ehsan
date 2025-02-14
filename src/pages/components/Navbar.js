import React, { useState , useContext} from 'react';
import { FaBell } from 'react-icons/fa';
import '../../styles/Navbar.css'; // تأكدي من وجود ملف CSS
import { LanguageContext } from '../../context/LanguageContext'; // استيراد الكونتكست

const Navbar = () => {
    const { language} = useContext(LanguageContext);
    const isArabic = language === "ar";
    // حالة التحكم في ظهور قائمة الإشعارات
    const [showNotifications, setShowNotifications] = useState(false);

    // بيانات الإشعارات (يمكن جلبها من API لاحقًا)
    const notifications = [
        { id: 1, text: 'تم قبول طلب انضمامك إلى مجموعة التحفيظ.' },
        { id: 2, text: 'لديك رسالة جديدة من المشرف' },
        { id: 3, text: 'تم تحديث بيانات حسابك' }
    ];

    return (
        <div className={`navbar ${isArabic ? "rtl" : "ltr"}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="navbar-content">
                {/* اسم الموقع */}
                <h2 className="navbar-title">ميرنا حماده حنفي</h2>

                {/* أيقونة الإشعارات */}
                <div className="notifications-container">
                    <FaBell 
                        className="notification-icon"
                        onClick={() => setShowNotifications(!showNotifications)} // تبديل القائمة
                    />
                    {showNotifications && (
                        <div className="notifications-dropdown">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div key={notification.id} className="notification-item">
                                        {notification.text}
                                    </div>
                                ))
                            ) : (
                                <div className="notification-item empty">لا توجد إشعارات جديدة</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
