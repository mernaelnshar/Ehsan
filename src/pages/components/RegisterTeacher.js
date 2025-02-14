import React, { useState, useContext, useEffect } from "react";
import "../../styles/RegisterTeacher.css";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    registerTeacherTitle: { ar: "تسجيل المعلم في الحلقة", en: "Register Teacher in the Session" },
    addSession: { ar: "إضافة جلسة جديدة", en: "Add New Session" },
    sessionName: { ar: "اسم الحلقة", en: "Session Name" },
    selectSession: { ar: "اختر الحلقة", en: "Select a Session" },
    sessionTime: { ar: "وقت الحلقة", en: "Session Time" },
    selectTime: { ar: "اختر الوقت", en: "Select Time" },
    sessionType: { ar: "نوع الحلقة", en: "Session Type" },
    selectType: { ar: "اختر نوع الحقلة", en: "Select Session Type" },
    save: { ar: "تسجيل", en: "Save" },
    accepted: { ar: "مقبول", en: "Accepted" },
    rejected: { ar: "مرفوض", en: "Rejected" },
    pending: { ar: "انتظار", en: "Pending" },
    alertMessage: {
        ar: "يرجى اختيار جميع القيم قبل إضافة الجلسة.",
        en: "Please select all values before adding the session.",
    },
};


const getStatusIcon = (status, language) => {
    switch (status) {
        case texts.accepted[language]:
            return <FaCheckCircle className="status-icon accepted" />;
        case texts.rejected[language]:
            return <FaTimesCircle className="status-icon rejected" />;
        case texts.pending[language]:
            return <FaHourglassHalf className="status-icon pending" />;
        default:
            return null;
    }
};

const RegisterTeacher = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";

    const [sessions, setSessions] = useState([]);

    
    useEffect(() => {
        const sessionsData = [
            {
                id: 1,
                session: isArabic ? "حفصة بنت عمرو رضي الله عنها - القسم النسائي" : "Hafsa Bint Amr - Women's Section",
                time: isArabic ? "٨ - ١٠ م" : "8 - 10 PM",
                type: isArabic ? "الحفظ" : "Hifz",
                status: texts.accepted[language],
            },
            {
                id: 2,
                session: isArabic ? "زينب بنت جحش - القسم النسائي" : "Zainab Bint Jahsh - Women's Section",
                time: isArabic ? "٦ - ٨ م" : "6 - 8 PM",
                type: isArabic ? "المراجعة" : "Review",
                status: texts.rejected[language],
            },
            {
                id: 3,
                session: isArabic ? "عائشة بنت أبي بكر - القسم النسائي" : "Aisha Bint Abu Bakr - Women's Section",
                time: isArabic ? "٥ - ٧ م" : "5 - 7 PM",
                type: isArabic ? "التلاوة" : "Tilawah",
                status: texts.pending[language],
            },
        ];
        setSessions(sessionsData);
    }, [language]); 

    const [showModal, setShowModal] = useState(false);
    const [newSession, setNewSession] = useState({ name: "", time: "", type: isArabic ? "الحفظ" : "Hifz" });

    
    const handleAddSession = () => {
        if (!newSession.name || !newSession.time || !newSession.type) {
            alert(texts.alertMessage[language]);
            return;
        }

        const newSessionData = {
            id: Date.now(),
            session: newSession.name,
            time: newSession.time,
            type: newSession.type,
            status: texts.pending[language],
        };

        setSessions([...sessions, newSessionData]);
        setShowModal(false);
        setNewSession({ name: "", time: "", type: isArabic ? "الحفظ" : "Hifz" });
    };

    return (
        <div className={`register-teacher-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h1 className="register-teacher-title">{texts.registerTeacherTitle[language]}</h1>
            <div className="register-teacher-grid">
                {sessions.map((session) => (
                    <div key={session.id} className="session-card">
                        <h3 className="session-title">{session.session}</h3>
                        <p className="session-time">{session.time}</p>
                        <div className="session-details">
                            <p className="session-type">{session.type}</p>
                            <p className={`session-status ${session.status === texts.accepted[language] ? "accepted" : session.status === texts.rejected[language] ? "rejected" : "pending"}`}>
                                {getStatusIcon(session.status, language)} {session.status}
                            </p>
                        </div>
                    </div>
                ))}

                {/* زر الإضافة */}
                <button className="add-session-btn" onClick={() => setShowModal(true)}>
                    <FaPlus />
                </button>

                {/* المودال لإضافة جلسة جديدة */}
                <Modal show={showModal} onHide={() => setShowModal(false)} className={`modal-add-session ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{texts.addSession[language]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionName[language]}</Form.Label>

                                <Form.Select
                                    className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                    value={newSession.name}
                                    onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                                >
                                    <option value="">{texts.selectSession[language]}</option>
                                    <option value="حفصة بنت عمرو رضي الله عنها - القسم النسائي">حفصة بنت عمرو - القسم النسائي</option>
                                    <option value="زينب بنت جحش - القسم النسائي">زينب بنت جحش - القسم النسائي</option>
                                    <option value="عائشة بنت أبي بكر - القسم النسائي">عائشة بنت أبي بكر - القسم النسائي</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionTime[language]}</Form.Label>
                                <Form.Select
                                    className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                    value={newSession.time}
                                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                >
                                    <option value="">{texts.selectTime[language]}</option>
                                    <option value="من 8 إلى 10 م">من 8 إلى 10 م</option>
                                    <option value="من 6 إلى 8 م">من 6 إلى 8 م</option>
                                    <option value="من 5 إلى 7 م">من 5 إلى 7 م</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionType[language]}</Form.Label>
                                <Form.Select
                                    className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                    value={newSession.type}
                                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                                >
                                    <option value=""> {texts.selectType[language]}</option>
                                    <option value="الحفظ">الحفظ</option>
                                    <option value="المراجعة">المراجعة</option>
                                    <option value="التلاوة">التلاوة</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="add-btn" onClick={handleAddSession}>
                            {texts.save[language]}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterTeacher;
