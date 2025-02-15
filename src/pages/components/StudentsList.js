import React, { useState, useEffect, useContext } from "react";
import { Form, Table, Container, Modal, Button } from "react-bootstrap";
import "../../styles/StudentsList.css";
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    ar: {
        title: "مراقبة الحضور",
        searchPlaceholder: "🔍 ابحث عن الطالب...",
        name: "الاسم",
        status: "الحالة",
        present: "حاضر",
        absent: "غائب",
        excusedAbsent: "غائب مع عذر",
        enterExcuse: "إدخال سبب العذر",
        enterExcusePlaceholder: "اكتب السبب هنا...",
        cancel: "إلغاء",
        save: "حفظ"
    },
    en: {
        title: "Attendance Monitoring",
        searchPlaceholder: "🔍 Search for student...",
        name: "Name",
        status: "Status",
        present: "Present",
        absent: "Absent",
        excusedAbsent: "Absent with Excuse",
        enterExcuse: "Enter Excuse Reason",
        enterExcusePlaceholder: "Write the reason here...",
        cancel: "Cancel",
        save: "Save"
    }
};

const StudentsList = () => {
    const { language } = useContext(LanguageContext);
    const t = texts[language] || texts.en;
    const isArabic = language === "ar";
    const [search, setSearch] = useState("");
    const [students] = useState([
        { id: 1, name: "أحمد محمد" },
        { id: 2, name: "فاطمة علي" },
        { id: 3, name: "خالد سمير" },
    ]);

    const navigate = useNavigate(); 

    const [attendanceStatus, setAttendanceStatus] = useState(() => {
        return JSON.parse(localStorage.getItem("attendanceStatus")) || {};
    });

    const [excuseReasons, setExcuseReasons] = useState(() => {
        return JSON.parse(localStorage.getItem("excuseReasons")) || {};
    });

    useEffect(() => {
        localStorage.setItem("attendanceStatus", JSON.stringify(attendanceStatus));
        localStorage.setItem("excuseReasons", JSON.stringify(excuseReasons));
    }, [attendanceStatus, excuseReasons]);

    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [excuseReason, setExcuseReason] = useState("");

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceStatus((prev) => ({
            ...prev,
            [studentId]: status
        }));

        if (status === t.present) {
            navigate('/StudentEvaluation');
        } else if (status === t.excusedAbsent) {
            setSelectedStudent(studentId);
            setExcuseReason(excuseReasons[studentId] || "");
            setShowModal(true);
        }
    };

    const handleSaveExcuse = () => {
        setExcuseReasons((prev) => ({
            ...prev,
            [selectedStudent]: excuseReason
        }));
        setShowModal(false);
    };

    return (
        <Container className={`Container-StudentsList ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <div className="header-container">
                <h2 className="text-center w-50">{t.title}</h2>
                <Form.Control
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t.name}</th>
                        <th>{t.status}</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .filter((student) => student.name.includes(search))
                        .map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>
                                    <Form className="radio-container">
                                        <Form.Check
                                            inline
                                            label={t.present}
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`present-${student.id}`}
                                            checked={attendanceStatus[student.id] === t.present}
                                            onChange={() => handleAttendanceChange(student.id, t.present)}
                                        />
                                        <Form.Check
                                            inline
                                            label={t.absent}
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`absent-${student.id}`}
                                            checked={attendanceStatus[student.id] === t.absent}
                                            onChange={() => handleAttendanceChange(student.id, t.absent)}
                                        />
                                        <Form.Check
                                            inline
                                            label={t.excusedAbsent}
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`excused-${student.id}`}
                                            checked={attendanceStatus[student.id] === t.excusedAbsent}
                                            onChange={() => handleAttendanceChange(student.id, t.excusedAbsent)}
                                        />
                                        {attendanceStatus[student.id] === t.excusedAbsent && excuseReasons[student.id] && (
                                            <div className="excuse-text">📌 {excuseReasons[student.id]}</div>
                                        )}
                                    </Form>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered className={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                <Modal.Header closeButton>
                    <Modal.Title>{t.enterExcuse}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{t.enterExcuse}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={excuseReason}
                            onChange={(e) => setExcuseReason(e.target.value)}
                            placeholder={t.enterExcusePlaceholder}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} className="Container-StudentsList-btn">
                        {t.cancel}
                    </Button>
                    <Button onClick={handleSaveExcuse} className="Container-StudentsList-btn">
                        {t.save}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentsList;
