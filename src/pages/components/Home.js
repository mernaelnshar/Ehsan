import React, { useState, useContext } from "react";
import '../../styles/Home.css';
import { FaChalkboardTeacher, FaUserGraduate, FaVideo, FaIdCard } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { LanguageContext } from '../../context/LanguageContext';

const texts = {
    ar: {
        rateTeacher: "تقييم المعلم",
        rating: "التقييم",
        save: "حفظ التقييم",
        dashboard: "لوحة التحكم",
        attendance: "الحضور",
        evaluation: "التقييم",
        monitor: "مراقبة الحضور",
        review: "التقييم",
        teacher: "معلم",
        student: "طالب"
    },
    en: {
        rateTeacher: "Rate Teacher",
        rating: "Rating",
        save: "Save Rating",
        dashboard: "Dashboard",
        attendance: "Attendance",
        evaluation: "Evaluation",
        monitor: "Monitor Attendance",
        review: "Review",
        teacher: "Teacher",
        student: "Student"
    }
};



const ProgressBar = ({ percentage }) => (
    <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
            {percentage}%
        </div>
    </div>
);

const Home = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = texts[language];

    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const navigate = useNavigate();

    const sessions = [
        {
            id: 1,
            role: t.teacher,
            session: isArabic ? 'حلقات الحفظ' : 'Memorization Sessions',
            students: 3872,
            time: isArabic ? '٨ - ١٠ م' : '8 - 10 PM',
            type: isArabic ? 'الحفظ' : 'Hifz',
            attendance: 75,
            evaluation: 85
        },
        {
            id: 2,
            role: t.student,
            session: isArabic ? 'حلقات المراجعة' : 'Revision Sessions',
            students: 1200,
            time: isArabic ? '٦ - ٨ م' : '6 - 8 PM',
            type: isArabic ? 'المراجعة' : 'Review',
            attendance: 90,
            evaluation: 95
        },
        {
            id: 3,
            role: t.teacher,
            session: isArabic ? 'حلقات التلاوة' : 'Recitation Sessions',
            students: 950,
            time: isArabic ? '٥ - ٧ م' : '5 - 7 PM',
            type: isArabic ? 'التلاوة' : 'Tilawah',
            attendance: 60,
            evaluation: 70
        }
    ];

    const RatingModal = ({ show, handleClose, session }) => {
        const [hifzRating, setHifzRating] = useState(0);
        const { language } = useContext(LanguageContext);
        const t = texts[language];
    
        const getLabel = (rating) => {
            const labels = language === "ar" ? ["سيئ", "مقبول", "جيد", "جيد جدًا", "ممتاز"] : ["Poor", "Fair", "Good", "Very Good", "Excellent"];
            return rating > 0 ? labels[rating - 1] : (language === "ar" ? "لم يتم التقييم" : "Not Rated");
        };
    
        return (
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton dir={isArabic ? "rtl" : "ltr"} >
                    <Modal.Title>{t.rateTeacher}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" dir={isArabic ? "rtl" : "ltr"}>
                    <div className="rating-section">
                        <p>{t.rating}</p>
                        <ReactStars
                            count={5}
                            value={hifzRating}
                            onChange={setHifzRating}
                            size={40}
                            activeColor="#FFD700"
                        />
                        <p className="rating-label">{getLabel(hifzRating)}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" variant="primary" onClick={handleClose}>
                        {t.save}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className={`sessionscontainer ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <div className="sessionsgrid"> 
                {sessions.map((session) => (
                    <div key={session.id} className="sessioncard">
                        <div className="sessionheader">
                            <div className="teacherinfo">
                                {session.role === t.teacher ? <FaChalkboardTeacher className="icon" /> : <FaUserGraduate className="icon" />}
                                <p>{session.role}</p>
                            </div>
                            <div className="icons">
                                <FaVideo className="videoicon" />
                                <FaIdCard className="idicon" style={{ cursor: "pointer" }} onClick={() => {
                                    if (session.role === t.teacher) {
                                        navigate('/StudentRecords');
                                    } else {
                                        navigate('/ProfileTeacher');
                                    }
                                }} />
                            </div>
                        </div>

                        <h3 className="sessiontitle">{session.session} ({session.students})</h3>

                        <div className="sessiondetails">
                            <p className="sessiontype">{session.type}</p>
                            <p className="sessiontime">{session.time}</p>
                            <p className="sessionstudents">30 <FaUserGraduate /></p>
                        </div>

                        <div className="progress-section">
                            <span>{t.attendance}</span>
                            <ProgressBar percentage={session.attendance} />
                        </div>

                        <div className="progress-section">
                            <span>{t.evaluation}</span>
                            <ProgressBar percentage={session.evaluation} />
                        </div>

                        <Button className="monitoringbtn" onClick={() => {
                            if (session.role === t.teacher) {
                                navigate('/StudentsList');
                            } else {
                                setSelectedSession(session);
                                setShowModal(true);
                            }
                        }}>
                            {session.role === t.teacher ? t.monitor : t.review}
                        </Button>
                    </div>
                ))}
            </div>

            {selectedSession && <RatingModal show={showModal} handleClose={() => setShowModal(false)} session={selectedSession} />}
        </div>
    );
};

export default Home;
