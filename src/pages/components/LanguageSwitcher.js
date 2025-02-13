import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../../styles/LandingPage.css';

const LanguageSwitcher = ({ switchLanguage }) => {
    const [active, setActive] = useState('ar'); // الحالة لتتبع العنصر النشط

    const handleLanguageChange = (lang) => {
        setActive(lang);
        switchLanguage(lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    };
    

    return (
        <div className="ArEn">
            <Link 
                to="ar" 
                smooth={true} 
                duration={500} 
                className={`link ${active === 'ar' ? 'active-ar' : 'inactive'}`}
                onClick={() => handleLanguageChange('ar')}  // تغيير اللغة عند النقر
            >
                AR
            </Link>
            <Link 
                to="en" 
                smooth={true} 
                duration={500} 
                className={`link ${active === 'en' ? 'active-en' : 'inactive'}`}
                onClick={() => handleLanguageChange('en')}  // تغيير اللغة عند النقر
            >
                | EN
            </Link>
        </div>
    );
};

export default LanguageSwitcher;
