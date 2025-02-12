import React, { useState, useEffect } from "react";
import { Form, Table, Container, Modal, Button } from "react-bootstrap";
import "../../styles/StudentsList.css";
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
    const [search, setSearch] = useState("");
    const [students] = useState([
        { id: 1, name: "أحمد محمد" },
        { id: 2, name: "فاطمة علي" },
        { id: 3, name: "خالد سمير" },
    ]);

    const navigate = useNavigate(); 

    // ✅ تحميل بيانات الحضور من localStorage عند تحميل الصفحة
    const [attendanceStatus, setAttendanceStatus] = useState(() => {
        return JSON.parse(localStorage.getItem("attendanceStatus")) || {};
    });

    // ✅ تحميل أسباب الغياب من localStorage عند تحميل الصفحة
    const [excuseReasons, setExcuseReasons] = useState(() => {
        return JSON.parse(localStorage.getItem("excuseReasons")) || {};
    });

    // ✅ حفظ البيانات في localStorage عند أي تغيير
    useEffect(() => {
        localStorage.setItem("attendanceStatus", JSON.stringify(attendanceStatus));
        localStorage.setItem("excuseReasons", JSON.stringify(excuseReasons));
    }, [attendanceStatus, excuseReasons]);

    // ✅ إدارة حالة المودال
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [excuseReason, setExcuseReason] = useState("");

    // ✅ تحديث حالة الحضور عند التغيير
    const handleAttendanceChange = (studentId, status) => {
        setAttendanceStatus((prev) => ({
            ...prev,
            [studentId]: status
        }));

        if (status === "حاضر") {
            navigate('/StudentEvaluation');
        } else if (status === "غائب مع عذر") {
            setSelectedStudent(studentId);
            setExcuseReason(excuseReasons[studentId] || ""); // تحميل السبب المخزن إن وجد
            setShowModal(true);
        }
    };

    // ✅ حفظ سبب العذر
    const handleSaveExcuse = () => {
        setExcuseReasons((prev) => ({
            ...prev,
            [selectedStudent]: excuseReason
        }));

        setShowModal(false);
    };

    return (
        <Container className="Container-StudentsList" dir="rtl">
            <div className="header-container">
                <h2 className="text-center">مراقبة الحضور</h2>
                <Form.Control
                    type="text"
                    placeholder="🔍 ابحث عن الطالب..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>الحالة</th>
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
                                            label="حاضر"
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`present-${student.id}`}
                                            checked={attendanceStatus[student.id] === "حاضر"}
                                            onChange={() => handleAttendanceChange(student.id, "حاضر")}
                                        />
                                        <Form.Check
                                            inline
                                            label="غائب"
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`absent-${student.id}`}
                                            checked={attendanceStatus[student.id] === "غائب"}
                                            onChange={() => handleAttendanceChange(student.id, "غائب")}
                                        />
                                        <Form.Check
                                            inline
                                            label="غائب مع عذر"
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`excused-${student.id}`}
                                            checked={attendanceStatus[student.id] === "غائب مع عذر"}
                                            onChange={() => handleAttendanceChange(student.id, "غائب مع عذر")}
                                        />
                                        {attendanceStatus[student.id] === "غائب مع عذر" && excuseReasons[student.id] && (
                                            <div className="excuse-text">📌 {excuseReasons[student.id]}</div>
                                        )}
                                    </Form>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            {/*  مودال إدخال سبب العذر */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>إدخال سبب العذر</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>يرجى كتابة سبب العذر</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={excuseReason}
                            onChange={(e) => setExcuseReason(e.target.value)}
                            placeholder="اكتب السبب هنا..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} className="Container-StudentsList-btn">
                        إلغاء
                    </Button>
                    <Button  onClick={handleSaveExcuse} className="Container-StudentsList-btn">
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentsList;
