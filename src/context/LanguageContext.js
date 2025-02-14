import { createContext, useState, useEffect } from "react";

// إنشاء الكونتكست
export const LanguageContext = createContext();

// مزود اللغة
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "ar");

    // دالة تغيير اللغة
    const switchLanguage = (lang) => {
        setLanguage(lang);
    };

    // حفظ اللغة في Local Storage عند التغيير
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
