import React, { useState , useEffect } from 'react';
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
import LanguageSwitcher from '../pages/components/LanguageSwitcher';
import { Navbar, Nav, Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6"; // أيقونات بديلة للصور

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

    // تغيير اتجاه الصفحة بناءً على اللغة
    useEffect(() => {
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.style.setProperty('--text-align', language === "ar" ? "right" : "left");
        document.documentElement.style.setProperty('--flex-direction', language === "ar" ? "row-reverse" : "row");
    }, [language]);

    return (
        <div className='body' dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Navbar bg="light" expand="lg" className="px-3">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="home" smooth={true} duration={500}>
                            {texts[language].home}
                        </Nav.Link>
                        <Nav.Link as={Link} to="features" smooth={true} duration={500}>
                            {texts[language].features}
                        </Nav.Link>
                        <Nav.Link as={Link} to="how-it-works" smooth={true} duration={500}>
                            {texts[language].howItWorks}
                        </Nav.Link>
                        <Nav.Link as={Link} to="contact" smooth={true} duration={500}>
                            {texts[language].contact}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <LanguageSwitcher switchLanguage={switchLanguage} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>

            <Container fluid className="main" dir={language === 'ar' ? 'rtl' : 'ltr'} id="home">
                <Row className="align-items-center">
                    <Col md={6} className="text-container">
                        <div className="title">
                            <span>{texts[language].journeyTitle1}</span>
                            <span>{texts[language].journeyTitle2}</span>
                            <span>{texts[language].journeyTitle3}</span>
                        </div>
                        <p className="text-description">{texts[language].description}</p>
                        <div className="btnn">
                            <Button className="android">
                                {texts[language].downloadAndroid} <img src={Android} alt="Android" />
                            </Button>
                            <Button className="iOS">
                                {texts[language].downloadIOS} <img src={iOS} alt="iOS" />
                            </Button>
                        </div>
                        <div className="btnn">
                            <Button onClick={() => navigate('/Login')}>{texts[language].startNow}</Button>
                        </div>
                    </Col>
                    <Col md={6} className="image-container">
                        <img className="logo" src={Logo} alt="Placeholder" />
                    </Col>
                </Row>
            </Container>

            <Container fluid className="NumberOfStudentsAndTeachers" dir={language === 'ar' ? 'rtl' : 'ltr'} >
                <Row className="justify-content-center text-center">
                <Col md={4} className="group">
                        <div className="num">
                            <h1>1200</h1>
                            <img src={plus} alt="plus" />
                        </div>
                        <p>{texts[language].numStudents}</p>
                    </Col>
                    <Col md={4} className="group">
                        <div className="num">
                            <h1>50</h1>
                            <img src={plus} alt="plus" />
                        </div>
                        <p>{texts[language].numTeachers}</p>
                    </Col>
                    
                    <Col md={4} className="group">
                        <div className="num">
                            <h1>15</h1>
                            <img src={plus} alt="plus" />
                        </div>
                        <p>{texts[language].numGroups}</p>
                    </Col>
                </Row>
            </Container>

            <Container fluid className="features-section text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}  id="features">
                <h2 className="features-title">{texts[language].platformFeatures}</h2>
                <p className="features-description">{texts[language].description}</p>
                <Row className="justify-content-center mt-4">
                    {[
                        { img: phone, title: texts[language].easyExperience, desc: texts[language].feature1 },
                        { img: clock, title: texts[language].flexibleTime, desc: texts[language].feature2 },
                        { img: book, title: texts[language].interactiveMemorization, desc: texts[language].feature3 },
                    ].map((feature, index) => (
                        <Col key={index} md={4} className="d-flex justify-content-center">
                            <Card className="feature-card">
                                <Card.Img variant="top" src={feature.img} className="feature-img" />
                                <Card.Body>
                                    <Card.Title className="feature-title">{feature.title}</Card.Title>
                                    <Card.Text className="feature-text">{feature.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container fluid className="howit-section text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}  id="how-it-works">
                <h2 className="howit-title">{texts[language].howItWorksTitle}</h2>
                <Row className="justify-content-center howit-cards">
                    {[
                        { title: texts[language].registerAccount, className: "step3" },
                        { title: texts[language].chooseGroup, className: "step2" },
                        { title: texts[language].firstStep, className: "step1" },
                    ].map((step, index) => (
                        <Col key={index} className="d-flex justify-content-center">
                            <Card className={`howit-card ${step.className}`}>
                                <Card.Body>
                                    <Card.Title className="howit-text">{step.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <ContactUs language={language} />

            <footer className="footer-container" dir={language === "ar" ? "rtl" : "ltr"}>
                <Container>
                    <Row className="align-items-center">
                        {/* القسم الأيسر */}
                        <Col lg={4} className="text-center" >
                            <div className="logo-container d-flex align-items-center justify-content-center ">
                                <img className="logo" src={Logo} alt="Logo" />
                                <div className="brand-name">{texts[language].brandname}</div>
                            </div>
                            <p className="copyright-text">{texts[language].copyright}</p>
                        </Col>

                        {/* روابط التنقل */}
                        <Col lg={4} className="text-center">
                            <Nav className="justify-content-center nav-links">
                                <Nav.Item>
                                    <Link to="contact" smooth={true} duration={500} className="nav-link">{texts[language].contact}</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="how-it-works" smooth={true} duration={500} className="nav-link">{texts[language].howItWorks}</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="features" smooth={true} duration={500} className="nav-link">{texts[language].features}</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="home" smooth={true} duration={500} className="nav-link">{texts[language].home}</Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        {/* القسم الأيمن */}
                        <Col lg={4} className="text-center">
                        <div className='contact-container'>
                            <p className="contact-email">{texts[language].footerContactEmail}</p>
                            <div className="iconsFooter">
                                <a href=".." className="icon"><FaInstagram  /></a>
                                <a href=".." className="icon"><FaXTwitter  /></a>
                                <a href=".." className="icon"><FaWhatsapp  /></a>
                            </div>
                            <div className="privacy-terms d-flex gap-3">
                                <p>{texts[language].privacyPolicy}</p>
                                <p>{texts[language].termsConditions}</p>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default LandingPage;
