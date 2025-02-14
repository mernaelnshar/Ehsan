import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Link } from "react-scroll";
import "../../styles/LandingPage.css";

const LanguageSwitcher = () => {
    const { language, switchLanguage } = useContext(LanguageContext);

    const handleLanguageChange = (lang) => {
        switchLanguage(lang); // استخدام switchLanguage بدلاً من setLanguage
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    };

    return (
        <div className="ArEn">
            <Link 
                to="ar" 
                smooth={true} 
                duration={500} 
                className={`link ${language === 'ar' ? 'active-ar' : 'inactive'}`}
                onClick={() => handleLanguageChange('ar')}
            >
                AR
            </Link>
            <Link 
                to="en" 
                smooth={true} 
                duration={500} 
                className={`link ${language === 'en' ? 'active-en' : 'inactive'}`}
                onClick={() => handleLanguageChange('en')}
            >
                | EN
            </Link>
        </div>
    );
};

export default LanguageSwitcher;
