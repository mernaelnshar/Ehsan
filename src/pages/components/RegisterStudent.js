import React, { useState, useContext, useEffect } from "react";
import "../../styles/RegisterStudent.css";
import { FaCheckCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { Button, Modal, Form, Spinner, Card } from "react-bootstrap";
import { LanguageContext } from "../../context/LanguageContext";
import {
    kStudentRole, kRequestsCollection, kName, kRequestStatus, kAcceptedStatus,
    kUid, kRole, kHalqaId, kHalqaName, kHalqaTime, kTypeName, kSessionId
} from "../../constants/constants";

// ترجمة النصوص
const texts = {
    registerStudentTitle: { ar: "تسجيل طالب في الحلقة", en: "Register Student in the Session" },
    addSession: { ar: "إضافة جلسة جديدة", en: "Add New Session" },
    sessionName: { ar: "اسم الحلقة", en: "Session Name" },
    selectSession: { ar: "اختر الحلقة", en: "Select a Session" },
    sessionTime: { ar: "وقت الحلقة", en: "Session Time" },
    selectTime: { ar: "اختر الوقت", en: "Select Time" },
    sessionType: { ar: "نوع الحلقة", en: "Session Type" },
    selectType: { ar: "اختر نوع الحقلة", en: "Select Session Type" },
    save: { ar: "تسجيل", en: "Save" },
    accepted: { ar: "مقبول", en: "Accepted" },
    pending: { ar: "انتظار", en: "Pending" },
    alertMessage: {
        ar: "يرجى اختيار جميع القيم قبل إضافة الجلسة.",
        en: "Please select all values before adding the session.",
    },
    noAvailableTimes: { ar: "لا توجد أوقات متاحة.", en: "No available times." },
};

// أيقونات الحالة
const getStatusIcon = (status) => {
    switch (status) {
        case kAcceptedStatus:
            return <FaCheckCircle className="status-icon accepted" />;
        case kRequestStatus:
            return <FaHourglassHalf className="status-icon pending" />;
        default:
            return null;
    }
};

// بيانات وهمية
const halqatTypesMock = [
    { typeId: "t1", typeName: "قراءة" },
    { typeId: "t2", typeName: "تجويد" },
];

const halqatByTypeMock = {
    t1: [
        { halqaId: "h1", halqaName: "حلقة 1", halqaTypeName: "قراءة", sessionId: "s1" },
        { halqaId: "h2", halqaName: "حلقة 2", halqaTypeName: "قراءة", sessionId: "s2" },
    ],
    t2: [
        { halqaId: "h3", halqaName: "حلقة 3", halqaTypeName: "تجويد", sessionId: "s3" },
    ],
};

const sessionTimesMock = {
    h1: [{ timeId: "1", halqaTime: "08:00" }, { timeId: "2", halqaTime: "10:00" }],
    h2: [{ timeId: "3", halqaTime: "12:00" }],
    h3: [{ timeId: "4", halqaTime: "14:00" }],
};

// دوال محاكاة
const getHalqatTypes = async () => halqatTypesMock;
const getHalqatByTypeStudent = async (typeId) => halqatByTypeMock[typeId] || [];
const getSessionTimes = async (halqaId) => sessionTimesMock[halqaId] || [];

// مستخدم وهمي
const currentUserMock = { uid: "user1", firstName: "أحمد", fatherName: "محمد" };

// تنسيق الوقت
const formatTime = ({ time }) => time;

const RegisterStudent = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";

    const [showModal, setShowModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({ name: "", time: "", type: "", status: "" });

    const [halqatTypes, setHalqatTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [halqatList, setHalqatList] = useState([]);
    const [selectedHalqa, setSelectedHalqa] = useState("");
    const [sessionTimes, setSessionTimes] = useState([]);
    const [loading, setLoading] = useState(false);

    // تحميل أنواع الحلقات
    useEffect(() => {
        const fetchTypes = async () => {
            setLoading(true);
            const types = await getHalqatTypes();
            setHalqatTypes(types);
            setLoading(false);
        };
        fetchTypes();
    }, [showModal]);

    // تغيير النوع
    const handleTypeChange = async (typeId) => {
        setSelectedType(typeId);
        setSelectedHalqa("");
        setSessionTimes([]);
        if (typeId) {
            setLoading(true);
            const halqat = await getHalqatByTypeStudent(typeId);
            setHalqatList(halqat);
            setLoading(false);
        }
    };

    // تغيير الحلقة
    const handleHalqaChange = async (halqaId) => {
        setSelectedHalqa(halqaId);
        setSessionTimes([]);
        if (!halqaId) return;
        setLoading(true);
        const times = await getSessionTimes(halqaId);
        setSessionTimes(times);
        setLoading(false);
    };

    const handleAddSession = async () => {
        if (!selectedType || !selectedHalqa || !newSession.time) {
            alert(texts.alertMessage[language]);
            return;
        }

        setLoading(true);
        const selectedTime = sessionTimes.find((time) => time.timeId === newSession.time);
        const selectedHalqaData = halqatList.find((halqa) => halqa.halqaId === selectedHalqa);

        const newSessionData = {
            [kHalqaId]: selectedHalqa,
            [kHalqaName]: selectedHalqaData?.halqaName || '',
            [kHalqaTime]: selectedTime?.halqaTime ?? '',
            [kName]: `${currentUserMock.firstName} ${currentUserMock.fatherName}`.trim(),
            [kRole]: kStudentRole,
            [kSessionId]: selectedHalqaData?.sessionId || '',
            [kTypeName]: selectedHalqaData?.halqaTypeName || '',
            [kUid]: currentUserMock.uid,
            status: kRequestStatus,
        };

        setSessions([...sessions, newSessionData]);
        setShowModal(false);
        setNewSession({ name: "", time: "", type: "", status: "" });
        setSelectedType("");
        setSelectedHalqa("");
        setLoading(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewSession({ name: "", time: "", type: "", status: "" });
        setSelectedType("");
        setSelectedHalqa("");
    };

    return (
        <div className={`register-student-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h1 className="register-student-title">{texts.registerStudentTitle[language]}</h1>
            <div className="register-student-grid">
                {sessions.map((session, index) => (
                    <Card key={index} className="session-card mb-4 shadow-sm" style={{ borderRadius: "15px" }}>
                        <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                            <Card.Title className="session-title mb-3">{session[kHalqaName]}</Card.Title>
                            <div className="session-details d-flex justify-content-center">
                                <p className="session">{session[kTypeName]}</p>
                                <p className="session">{formatTime({ time: session[kHalqaTime] })}</p>
                            </div>
                            <p className={`session-status mt-2 w-50 ${session.status === kAcceptedStatus ? "accepted" : "pending"}`}>
                                {getStatusIcon(session.status)}
                                {session.status === kAcceptedStatus ? texts.accepted[language] : texts.pending[language]}
                            </p>
                        </Card.Body>
                    </Card>
                ))}

                <button className="add-session-btn" onClick={() => setShowModal(true)}>
                    <FaPlus />
                </button>

                <Modal show={showModal} onHide={handleCloseModal} className={`modal-add-session ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{texts.addSession[language]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-content">
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status" variant="primary">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label>{texts.sessionType[language]}</Form.Label>
                                    <Form.Select
                                        value={selectedType}
                                        onChange={(e) => { handleTypeChange(e.target.value); setNewSession({ ...newSession, type: e.target.value }); }}
                                    >
                                        <option value="">{texts.selectType[language]}</option>
                                        {halqatTypes.map((type) => (
                                            <option key={type.typeId} value={type.typeId}>{type.typeName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>{texts.sessionName[language]}</Form.Label>
                                    <Form.Select
                                        value={selectedHalqa}
                                        onChange={(e) => { handleHalqaChange(e.target.value); const selected = halqatList.find(h => h.halqaId === e.target.value); setNewSession({ ...newSession, name: selected?.halqaName || "" }); }}
                                        disabled={!selectedType}
                                    >
                                        <option value="">{texts.selectSession[language]}</option>
                                        {halqatList.map((halqa) => (
                                            <option key={halqa.halqaId} value={halqa.halqaId}>{halqa.halqaName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>{texts.sessionTime[language]}</Form.Label>
                                    <Form.Select
                                        value={newSession.time}
                                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                        disabled={!selectedHalqa}
                                    >
                                        <option value="">{texts.selectTime[language]}</option>
                                        {sessionTimes.length > 0 ? (
                                            sessionTimes.map((time) => (
                                                <option key={time.timeId} value={time.timeId}>{formatTime({ time: time.halqaTime })}</option>
                                            ))
                                        ) : (
                                            <option disabled>{texts.noAvailableTimes[language]}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        )}
                        <Modal.Footer>
                            <Button className="add-btn" onClick={handleAddSession} disabled={loading}>{texts.save[language]}</Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterStudent;