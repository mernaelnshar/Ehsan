import React, { useState } from "react";
import { Form, Table, Container } from "react-bootstrap";
import "../../styles/StudentsList.css";
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
    const [search, setSearch] = useState("");
    const [students] = useState([
        { id: 1, name: "أحمد محمد" },
        { id: 2, name: "فاطمة علي" },
        { id: 3, name: "خالد سمير" },
    ]);

    const navigate = useNavigate(); // لإنشاء التنقل
    
        const goToStudentEvaluation = () => {
            navigate('/StudentEvaluation'); // اسم الصفحة اللي هتروحي لها
        };

    return (
        <Container className="Container-StudentsList" dir="rtl">
            {/* 🔍 العنوان ومربع البحث */}
            <div className="header-container">
                <h2 className="text-center">مراقبة الحضور</h2>
                <Form.Control
                    type="text"
                    placeholder="🔍 ابحث عن الطالب..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 📋 جدول الطلاب */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .filter((student) =>
                            student.name.includes(search) // 🔍 البحث حسب الاسم
                        )
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
                                            onClick={goToStudentEvaluation}
                                        />
                                        <Form.Check
                                            inline
                                            label="غائب"
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`absent-${student.id}`}
                                        />
                                        <Form.Check
                                            inline
                                            label="غائب مع عذر"
                                            type="radio"
                                            name={`status-${student.id}`}
                                            id={`excused-${student.id}`}
                                        />
                                    </Form>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentsList;
