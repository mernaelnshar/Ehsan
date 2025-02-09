import React, { useState } from "react";
import "../../styles/RegisterTeacher.css";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";

// البيانات الافتراضية للجلسات
const sessionsData = [
    { id: 1, name: "حفصة بنت عمرو رضي الله عنها - القسم النسائي", time: "من 8 إلى 10 م", type: "الحفظ", status: "مقبول" },
    { id: 2, name: "زينب بنت جحش - القسم النسائي", time: "من 6 إلى 8 م", type: "المراجعة", status: "مرفوض" },
    { id: 3, name: "عائشة بنت أبي بكر - القسم النسائي", time: "من 5 إلى 7 م", type: "التلاوة", status: "انتظار" },
];

// أيقونات الحالة
const getStatusIcon = (status) => {
    switch (status) {
        case "مقبول":
            return <FaCheckCircle className="status-icon accepted" />;
        case "مرفوض":
            return <FaTimesCircle className="status-icon rejected" />;
        case "انتظار":
            return <FaHourglassHalf className="status-icon pending" />;
        default:
            return null;
    }
};

const RegisterTeacher = () => {
    const [showModal, setShowModal] = useState(false);
    const [sessions, setSessions] = useState(sessionsData);
    const [newSession, setNewSession] = useState({ name: "", time: "", type: "الحفظ", status: "انتظار" });

    // دالة لإضافة الجلسة الجديدة
    const handleAddSession = () => {
        if (!newSession.name || !newSession.time || !newSession.type) {
            alert("يرجى اختيار جميع القيم قبل إضافة الجلسة.");
            return;
        }

        const newSessionData = {
            id: Date.now(), // توليد ID فريد لكل جلسة
            ...newSession,
            status: "انتظار", // الحالة الافتراضية
        };

        setSessions([...sessions, newSessionData]); // تحديث قائمة الجلسات
        setShowModal(false); // إغلاق المودال بعد الإضافة
        setNewSession({ name: "", time: "", type: "الحفظ", status: "انتظار" }); // إعادة تعيين القيم
    };

    return (
        <div className="register-teacher-container" dir="rtl">
            <h1 className="register-teacher-title">تسجيل المعلم في الحلقة</h1>
            <div className="register-teacher-grid">
                {sessions.map((session) => (
                    <div key={session.id} className="session-card">
                        <h3 className="session-title">{session.name}</h3>
                        <p className="session-time">{session.time}</p>
                        <div className="session-details">
                            <p className="session-type">{session.type}</p>
                            <p className={`session-status ${session.status === "مقبول" ? "accepted" : session.status === "مرفوض" ? "rejected" : "pending"}`}>
                                {getStatusIcon(session.status)} {session.status}
                            </p>
                        </div>
                    </div>
                ))}

                {/* زر الإضافة */}
                <button className="add-session-btn" onClick={() => setShowModal(true)}>
                    <FaPlus />
                </button>

                {/* المودال لإضافة جلسة جديدة */}
                <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-add-session">
                    <Modal.Header closeButton>
                        <Modal.Title>إضافة جلسة جديدة</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-content">
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>اسم الحلقة</Form.Label>
                                <Form.Select
                                    className="modal-input"
                                    value={newSession.name}
                                    onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                                >
                                    <option value="">اختر الحلقة</option>
                                    <option value="حفصة بنت عمرو رضي الله عنها - القسم النسائي">حفصة بنت عمرو - القسم النسائي</option>
                                    <option value="زينب بنت جحش - القسم النسائي">زينب بنت جحش - القسم النسائي</option>
                                    <option value="عائشة بنت أبي بكر - القسم النسائي">عائشة بنت أبي بكر - القسم النسائي</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>وقت الحلقة</Form.Label>
                                <Form.Select
                                    className="modal-input"
                                    value={newSession.time}
                                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                >
                                    <option value="">اختر الوقت</option>
                                    <option value="من 8 إلى 10 م">من 8 إلى 10 م</option>
                                    <option value="من 6 إلى 8 م">من 6 إلى 8 م</option>
                                    <option value="من 5 إلى 7 م">من 5 إلى 7 م</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>نوع الحلقة</Form.Label>
                                <Form.Select
                                    className="modal-input"
                                    value={newSession.type}
                                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                                >
                                    <option value="الحفظ">الحفظ</option>
                                    <option value="المراجعة">المراجعة</option>
                                    <option value="التلاوة">التلاوة</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                        <Modal.Footer>
                            <Button className="add-btn" onClick={handleAddSession}>
                                تسجيل
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterTeacher;
