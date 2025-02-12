import React, { useState } from "react";
import { Table, Form, Dropdown, Container } from "react-bootstrap";
import { FaEye, FaBook, FaArchive, FaTrash, FaList } from "react-icons/fa";
import '../../styles/StudentRecords.css';
import { useNavigate } from 'react-router-dom';
const StudentRecords = () => {
    const navigate = useNavigate(); 
    const [search, setSearch] = useState("");

    const [students] = useState([
        { id: 1, name: "أحمد محمد" },
        { id: 2, name: "فاطمة علي" },
        { id: 3, name: "خالد سمير" },
    ]);

    return (
        <Container className="Container-StudentRecords" dir="rtl">
            {/* 🔍 شريط البحث */}
            <Form.Control
                type="text"
                placeholder="🔍 ابحث عن الطالب..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            {/* 📋 جدول الطلاب */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>الاسم</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .filter((student) => student.name.includes(search))
                        .map((student) => (
                            <tr key={student.id}>
                                <td> <div>{student.name} </div>
                                    <div className="iconsTable">
                                        <FaEye size={25} className="eye" onClick={()=>{navigate("/ProfileStudent")}} />
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
                                                <FaList size={25} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end">
                                                <Dropdown.Item href="#">
                                                    <FaBook className="me-2 " />
                                                    المنهج التعليمي
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <FaArchive className="me-2 " />
                                                    الأرشيف
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#" className="">
                                                    <FaTrash className="me-2" />
                                                    طلب إزالة
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>
                                </td>

                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentRecords;
