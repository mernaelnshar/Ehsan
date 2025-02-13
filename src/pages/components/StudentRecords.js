import React, { useState } from "react";
import { Table, Form, Dropdown, Container, Modal, Button } from "react-bootstrap";
import { FaEye, FaBook, FaArchive, FaTrash, FaList } from "react-icons/fa";
import '../../styles/StudentRecords.css';
import { useNavigate } from 'react-router-dom';

const StudentRecords = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [archiveReason, setArchiveReason] = useState("");
    const [errorReason, setErrorReason] = useState("");
    const [evaluationType, setEvaluationType] = useState(""); // 🆕 حالة لنوع التقييم
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [archiveRemoveReason, setArchiveRemoveReason] = useState("");

    const students = [
        { id: 1, name: "أحمد محمد" },
        { id: 2, name: "فاطمة علي" },
        { id: 3, name: "خالد سمير" },
    ];

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
        setArchiveReason("");
        setErrorReason("");
        setEvaluationType("");
    };

    const handleOpenRemoveModal = (student) => {
        setSelectedStudent(student);
        setShowRemoveModal(true);
        setArchiveRemoveReason("");
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setShowRemoveModal(false);
        setSelectedStudent(null);
    };
    


    return (
        <Container className="Container-StudentRecords" dir="rtl">
            {/*  شريط البحث */}
            <Form.Control
                type="text"
                placeholder="🔍 ابحث عن الطالب..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            {/*  جدول الطلاب */}
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
                                <td>
                                    <div>{student.name} </div>
                                    <div className="iconsTable">
                                        <FaEye size={25} className="eye" onClick={() => navigate("/ProfileStudent")} />
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
                                                <FaList size={25} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end">
                                                <Dropdown.Item onClick={() => navigate('/EducationalPlan')}>
                                                    <FaBook className="me-2" />
                                                    المنهج التعليمي
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleOpenModal(student)}>
                                                    <FaArchive className="me-2" />
                                                    الأرشيف
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleOpenRemoveModal(student)}>
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

            {/*  مودال الأرشيف */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaArchive className="me-2 " /> الأرشيف
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center mb-3"> الطالب: {selectedStudent?.name}</h5>
                    <Form>

                        {/* نوع التقييم */}
                        <Form.Group className="mt-3">
                            <Form.Label>نوع التقييم</Form.Label>
                            <Form.Select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
                                <option value="">اختر نوع التقييم</option>
                                <option value="حفظ">حفظ</option>
                                <option value="مراجعة">مراجعة</option>
                            </Form.Select>
                        </Form.Group>

                        {/*  سبب الأرشفة */}
                        <Form.Group>
                            <Form.Label>سبب الأرشفة</Form.Label>
                            <Form.Group className="reasons">
                                <Form.Check
                                    type="radio"
                                    label="تم الانتهاء"
                                    name="archiveReason"
                                    onChange={() => setArchiveReason("تم الانتهاء")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="خطأ في التقييم"
                                    name="archiveReason"
                                    onChange={() => setArchiveReason("خطأ في التقييم")}
                                />
                            </Form.Group>
                        </Form.Group>



                        {/* إدخال سبب الخطأ في التقييم */}
                        {archiveReason === "خطأ في التقييم" && (
                            <Form.Group className="mt-3">
                                <Form.Label>الرجاء إدخال سبب الخطأ</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="اكتب سبب الخطأ هنا..."
                                    value={errorReason}
                                    onChange={(e) => setErrorReason(e.target.value)}
                                />
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        disabled={(archiveReason === "خطأ في التقييم" && !errorReason) || !evaluationType} onClick={handleCloseModal}>
                        تأكيد الأرشفة
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*  مودال إدخال سبب الإزالة */}
            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title> <FaTrash className="me-2" /> الإزالة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <h5 className="text-center mb-3"> الطالب: {selectedStudent?.name}</h5>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="اكتب السبب هنا"
                            value={archiveRemoveReason}
                            onChange={(e) => setArchiveRemoveReason(e.target.value)}
                        />

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="Container-StudentsList-btn" disabled={!archiveRemoveReason} onClick={handleCloseModal}>
                        حفظ
                    </Button>

                </Modal.Footer>
            </Modal>


        </Container>
    );
};

export default StudentRecords;
