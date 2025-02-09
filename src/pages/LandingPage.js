import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-scroll";
import '../styles/LandingPage.css';
import ContactUs from './components/ContactUs';
import Logo from '../assets/image/logo.png';
import Android from '../assets/icon/android.png';
import iOS from '../assets/icon/ios.png';
import plus from '../assets/icon/plus.png';
import phone from '../assets/icon/phone.png';
import clock from '../assets/icon/clock.png';
import book from '../assets/icon/book.png';
import insta from '../assets/icon/insta.png';
import xxx from '../assets/icon/x.png';
import whats from '../assets/icon/whats.png';
import LanguageSwitcher from '../pages/components/LanguageSwitcher ';

function LandingPage() {
    const navigate = useNavigate()
    const [language, setLanguage] = useState('ar');  // Default language is Arabic

    // نصوص الصفحة بناءً على اللغة
    const texts = {
        ar: {
            contact: "اتصل بنا",
            howItWorks: "كيف يعمل",
            features: "المزايا",
            home: "الرئيسية",
            journeyTitle1: "رحلتك مع ",
            journeyTitle2: "إحسان ",
            journeyTitle3: "تبدأ هنا",
            description: "من منصة شاملة لتحفيظ القرآن الكريم توفر أدوات مميزة ودعمًا مستمرًا لمساعدتك على تحقيق أهدافك بسهولة وسلاسة",
            downloadAndroid: "تحميل Android",
            downloadIOS: "تحميل iOS",
            startNow: "ابدأ الآن",
            numGroups: "مجموعة",
            numTeachers: "معلم",
            numStudents: "طالب",
            platformFeatures: "مزايا منصتنا",
            easyExperience: "تجربة سهلة",
            feature1: "واجهة بسيطة وسهلة الاستخدام",
            flexibleTime: "مرونة في الوقت",
            feature2: "اختر الأوقات التي تناسب جدولك اليومي",
            interactiveMemorization: "تحفيظ تفاعلي",
            feature3: "تقنيات مبتكرة تساعدك على حفظ القرآن بسهولة",
            howItWorksTitle: "كيف يعمل؟",
            firstStep: "ابدأ خطواتك الأولى نحو حفظ القرآن الكريم",
            chooseGroup: "اختر مجموعتك",
            registerAccount: "سجل حسابك",
            footerContactEmail: "Ehsaan@gmail.com",
            privacyPolicy: "سياسة الخصوصية",
            termsConditions: "الشروط والأحكام",
            brandname: "إحسان",
            copyright: "جميع الحقوق محفوظة © 2025"
        },
        en: {
            contact: "Contact Us",
            howItWorks: "How It Works",
            features: "Features",
            home: "Home",
            journeyTitle1: "Your Journey with",
            journeyTitle2: "Ehsaan",
            journeyTitle3: "starts here",
            description: "A comprehensive platform for Quran memorization providing great tools and continuous support to help you achieve your goals easily and smoothly.",
            downloadAndroid: "Download Android",
            downloadIOS: "Download iOS",
            startNow: "Start Now",
            numGroups: "Group",
            numTeachers: "Teacher",
            numStudents: "Student",
            platformFeatures: "Our Platform Features",
            easyExperience: "Easy Experience",
            feature1: "Easy and user-friendly interface",
            flexibleTime: "Flexible Time",
            feature2: "Choose times that fit your daily schedule",
            interactiveMemorization: "Interactive Memorization",
            feature3: "Innovative techniques to help you memorize the Quran easily",
            howItWorksTitle: "How it works?",
            firstStep: "Take your first step toward Quran memorization",
            chooseGroup: "Choose your group",
            registerAccount: "Register your account",
            footerContactEmail: "Ehsaan@gmail.com",
            privacyPolicy: "Privacy Policy",
            termsConditions: "Terms & Conditions",
            brandname: "Ehsan",
            copyright: "All rights reserved © 2025"
        }
    };

    // تحديث اللغة عند التبديل
    const switchLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className='body'>
            <div className="Navbar">
                <LanguageSwitcher switchLanguage={switchLanguage} />
                <div className="nav-links">
                    <Link to="contact" smooth={true} duration={500} className="link">{texts[language].contact}</Link>
                    <Link to="how-it-works" smooth={true} duration={500} className="link">{texts[language].howItWorks}</Link>
                    <Link to="features" smooth={true} duration={500} className="link">{texts[language].features}</Link>
                    <Link to="home" smooth={true} duration={500} className="link">{texts[language].home}</Link>
                </div>
            </div>

            <div className="main" dir={language === 'ar' ? 'rtl' : 'ltr'} id='home'>
                <div className='right'>
                    <div className="title">
                        <span>{texts[language].journeyTitle1}</span>
                        <span>{texts[language].journeyTitle2}</span>
                        <span>{texts[language].journeyTitle3}</span>
                    </div>
                    <div className="text-description">
                        <p>{texts[language].description}</p>
                    </div>
                    <div className="btnn">
                        <button className="android">{texts[language].downloadAndroid} <img src={Android} alt='' /> </button>
                        <button className="iOS">{texts[language].downloadIOS} <img src={iOS} alt='' /> </button>
                    </div>
                    <div className="btnn">
                        <button onClick={() => navigate('/Login')}>{texts[language].startNow}</button>
                    </div>
                </div>
                <div className='left'>
                    <img className="logo" src={Logo} alt="Placeholder" />
                </div>
            </div>

            <div className="NumberOfStudentsAndTeachers">
                <div className="group">
                    <div className='num'>
                        <h1>15</h1>
                        <img src={plus} alt='' />
                    </div>
                    <p>{texts[language].numGroups}</p>
                </div>
                <div className="group">
                    <div className='num'>
                        <h1>50</h1>
                        <img src={plus}  alt=''/>
                    </div>
                    <p>{texts[language].numTeachers}</p>
                </div>
                <div className="group">
                    <div className='num'>
                        <h1>1200</h1>
                        <img src={plus} alt='' />
                    </div>
                    <p>{texts[language].numStudents}</p>
                </div>
            </div>

            <div className='Features' id='features'>
                <h2>{texts[language].platformFeatures}</h2>
                <p>{texts[language].description}</p>
                <div className='cards'>
                    <div className='card'>
                        <img src={phone} alt='' />
                        <h4>{texts[language].easyExperience}</h4>
                        <p>{texts[language].feature1}</p>
                    </div>
                    <div className='card'>
                        <img src={clock} alt='' />
                        <h4>{texts[language].flexibleTime}</h4>
                        <p>{texts[language].feature2}</p>
                    </div>
                    <div className='card'>
                        <img src={book} alt='' />
                        <h4>{texts[language].interactiveMemorization}</h4>
                        <p>{texts[language].feature3}</p>
                    </div>
                </div>
            </div>

            <div className='Howit' id='how-it-works'>
                <h2>{texts[language].howItWorksTitle}</h2>
                <div className='cards'>
                    <div className='card1'>
                        <h4>{texts[language].firstStep}</h4>
                    </div>
                    <div className='card2'>
                        <h4>{texts[language].chooseGroup}</h4>
                    </div>
                    <div className='card3'>
                        <h4>{texts[language].registerAccount}</h4>
                    </div>
                </div>
            </div>

            <ContactUs />

            <div className="footer-container" >
                <div className='left-text'>
                    <p className="contact-email">{texts[language].footerContactEmail}</p>
                    <div className='iconsFooter'>
                        <a href='..'><img src={insta} alt="instagram" /></a>
                        <a href='..'><img src={xxx} alt="xxx" /></a>
                        <a href='..'><img src={whats} alt="whatsapp" /></a>
                    </div>
                    <div className='privacy-terms'>
                        <p>{texts[language].privacyPolicy}</p>
                        <p>{texts[language].termsConditions}</p>
                    </div>
                </div>
                <div className="nav-links">
                    <Link to="contact" smooth={true} duration={500} className="link">{texts[language].contact}</Link>
                    <Link to="how-it-works" smooth={true} duration={500} className="link">{texts[language].howItWorks}</Link>
                    <Link to="features" smooth={true} duration={500} className="link">{texts[language].features}</Link>
                    <Link to="home" smooth={true} duration={500} className="link">{texts[language].home}</Link>
                </div>
                <div className="right-text" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="logo-container">
                        <img className="logo" src={Logo} alt="Logo" />
                        <div className="brand-name">{texts[language].brandname}</div>
                    </div>
                    <p className="copyright-text">{texts[language].copyright}</p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
