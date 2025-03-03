import React, { useState, useContext, useEffect } from "react";
import "../../styles/RegisterStudent.css";
import { FaCheckCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { LanguageContext } from "../../context/LanguageContext";
import { getHalqatTypes, getHalqatByTypeStudent, getSessionTimes, formatTime } from "../../firebase/firebaseService"; // تعديل المسار حسب المشروع
import { db } from "../../firebase/firebaseConfig"; // تأكدي من إعداد Firebase بشكل صحيح
import { collection, addDoc , getDocs } from "firebase/firestore";
import { kRequestsCollection, kName, kRequestStatus, kAcceptedStatus, kUid, kRole } from "../../constants/constants";


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
const getStatusIcon = (status, language) => {
    switch (status) {
        case kAcceptedStatus:
            return <FaCheckCircle className="status-icon accepted" />;
        case kRequestStatus:
            return <FaHourglassHalf className="status-icon pending" />;
        default:
            return null;
    }
};

const RegisterStudent = () => {

    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const [showModal, setShowModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({ name: "", time: "", type: isArabic ? "الحفظ" : "Hifz", status: isArabic ? "انتظار" : "Pending" });

    const [halqatTypes, setHalqatTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [halqatList, setHalqatList] = useState([]);
    const [selectedHalqa, setSelectedHalqa] = useState("");
    const [sessionTimes, setSessionTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    // Fetch halqat types on component mount
    useEffect(() => {
        const fetchHalqatTypes = async () => {
            setLoading(true);
            const types = await getHalqatTypes();
            setHalqatTypes(types);
            setLoading(false);
        };
        fetchHalqatTypes();
    }, [showModal]);


    // Fetch halqat list when type is selected
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

    // Fetch session times when halqa is selected
    // عند تغيير الحلقة، يتم جلب أوقات الجلسات المرتبطة بها
    const handleHalqaChange = async (halqaId) => {
        setSelectedHalqa(halqaId);
        setSessionTimes([]);

        if (!halqaId) return;

        try {
            setLoading(true);
            const times = await getSessionTimes(halqaId);
            setSessionTimes(times);
        } catch (error) {
            console.error("Error fetching session times:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSessionTimes = async () => {
            if (!selectedHalqa) return;

            try {
                setLoading(true);
                const times = await getSessionTimes(selectedHalqa);
                console.log("Raw Times Data:", times); // عرض البيانات الأصلية
                setSessionTimes(times);
            } catch (error) {
                console.error("Error fetching session times:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionTimes();
    }, [selectedHalqa]);

    const translations = {
        AM: "ص",
        PM: "م",
        From: "من",
        To: "إلى",
    };



    // دالة لإضافة الجلسة الجديدة
const handleAddSession = async () => {
    if (!selectedType || !selectedHalqa || !newSession.time) {
        alert(texts.alertMessage[language]);
        return;
    }

    const selectedTime = sessionTimes.find((time) => time.timeId === newSession.time);

    const newSessionData = {
        id: Date.now(),
        [kName]: newSession.name,
        type: halqatTypes.find((type) => type.typeId === selectedType)?.typeName || "",
        time: selectedTime?.halqaTime ?? "",
        status: kRequestStatus,
        [kRequestStatus]: kAcceptedStatus,
        [kUid]: 'uid',
        [kRole]: 'role'
    };

    try {
        await addDoc(collection(db, kRequestsCollection), newSessionData);
        alert("تم إرسال الطلب بنجاح!");

        // إضافة الجلسة الجديدة للـ State المحلي
        setSessions((prevSessions) => [...prevSessions, newSessionData]);

        // إعادة تعيين الحقول
        setShowModal(false);
        setNewSession({ name: "", time: "", type: "", status: texts.pending[language] });
        setSelectedType("");
        setSelectedHalqa("");
    } catch (error) {
        console.error("فشل في إرسال الطلب:", error);
        alert("حدث خطأ أثناء إرسال الطلب!");
    }
};

// جلب البيانات من Firebase عند تحميل الصفحة
useEffect(() => {
    const fetchSessions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, kRequestsCollection));
            const sessionsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSessions(sessionsData);
        } catch (error) {
            console.error("فشل في جلب البيانات:", error);
        }
    };

    fetchSessions();
}, []); // المصفوفة الفارغة عشان الـ useEffect يشتغل مرة واحدة عند تحميل الصفحة

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
                {sessions.map((session) => (
                    <div key={session.id} className="session-card">
                        <h3 className="session-title">{session.name}</h3>
                        <div className="session-details">
                            <p className="session">{session.type}</p>
                            <p className="session">{formatTime({ time: session.time, translations })}</p>
                        </div>
                        <p className={`session-status ${session.status === texts.accepted[language] ? "accepted" : "pending"}`}>
                            {getStatusIcon(session.status, language)} {session.status === kRequestStatus ? texts.pending[language] : texts.accepted[language]}
                        </p>
                    </div>
                ))}

                {/* زر الإضافة */}
                <button className="add-session-btn" onClick={() => setShowModal(true)}>
                    <FaPlus />
                </button>

                {/* المودال لإضافة جلسة جديدة */}
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    className={`modal-add-session ${isArabic ? "rtl" : "ltr"}`}
                    dir={isArabic ? "rtl" : "ltr"}
                >
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
                        ):(<>
                        <Form>
                        <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionType[language]}</Form.Label>
                                    <Form.Select
                                        className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                        value={selectedType}
                                        onChange={(e) => {
                                            setSelectedType(e.target.value);
                                            setNewSession({ ...newSession, type: e.target.value });
                                            handleTypeChange(e.target.value);
                                        }}>
                                        <option value="">{texts.selectType[language]}</option>
                                        {halqatTypes.map((type) => (
                                            <option key={type.typeId} value={type.typeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionName[language]}</Form.Label>
                                    <Form.Select
                                        className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                        value={selectedHalqa}
                                        onChange={(e) => {
                                            const selectedHalqa = halqatList.find((halqa) => halqa.halqaId === e.target.value);
                                            setSelectedHalqa(e.target.value);
                                            setNewSession({ ...newSession, name: selectedHalqa?.halqaName || "" });
                                            handleHalqaChange(e.target.value);
                                        }}
                                        disabled={!selectedType}>
                                        <option value="">{texts.selectSession[language]}</option>
                                        {halqatList.map((halqa) => (
                                            <option key={halqa.halqaId} value={halqa.halqaId}>
                                                {halqa.halqaName}
                                            </option>
                                        ))}
                                    </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>{texts.sessionTime[language]}</Form.Label>
                                    <Form.Select
                                        className={`modal-input custom-select ${isArabic ? "arabic-select" : "english-select"}`}
                                        value={newSession.time}
                                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                        disabled={!selectedHalqa}
                                    >
                                        <option value="">{texts.selectTime[language]}</option>
                                        {sessionTimes.length > 0 ? (
                                            sessionTimes.map((time) => {
                                                const formattedTime = formatTime({ time: time.halqaTime, translations });
                                                return (
                                                    <option key={time.timeId} value={time.timeId}>
                                                        {formattedTime}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option disabled>{texts.noAvailableTimes[language]}</option>
                                        )}
                                    </Form.Select>
                            </Form.Group>
                        </Form>
                        </>)}
                        
                        <Modal.Footer>
                            <Button className="add-btn" onClick={handleAddSession} disabled={loading}>
                                {texts.save[language]}
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterStudent;
