import React, { useState , useContext} from "react";
import { Table, Form, Dropdown, Container, Modal, Button } from "react-bootstrap";
import { FaEye, FaBook, FaArchive, FaTrash, FaList } from "react-icons/fa";
import '../../styles/StudentRecords.css';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    en: {
        searchPlaceholder: "🔍 Search for a student...",
        name: "Name",
        curriculum: "Educational Plan",
        archive: "Archive",
        removeRequest: "Removal Request",
        archiveTitle: "Archive",
        student: "Student:",
        evaluationType: "Evaluation Type",
        selectEvaluation: "Select evaluation type",
        archiveReason: "Archive Reason",
        completed: "Completed",
        evaluationError: "Evaluation Error",
        enterErrorReason: "Please enter the error reason",
        confirmArchive: "Confirm Archiving",
        removeTitle: "Removal",
        enterRemoveReason: "Enter reason here",
        save: "Save",
    },
    ar: {
        searchPlaceholder: "🔍 ابحث عن الطالب...",
        name: "الاسم",
        curriculum: "المنهج التعليمي",
        archive: "الأرشيف",
        removeRequest: "طلب إزالة",
        archiveTitle: "الأرشيف",
        student: "الطالب:",
        evaluationType: "نوع التقييم",
        selectEvaluation: "اختر نوع التقييم",
        archiveReason: "سبب الأرشفة",
        completed: "تم الانتهاء",
        evaluationError: "خطأ في التقييم",
        enterErrorReason: "الرجاء إدخال سبب الخطأ",
        confirmArchive: "تأكيد الأرشفة",
        removeTitle: "الإزالة",
        enterRemoveReason: "اكتب السبب هنا",
        save: "حفظ",
    }
};
const StudentRecords = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = texts[language];
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
        <Container className={`Container-StudentRecords ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            {/*  شريط البحث */}
            <Form.Control
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            {/*  جدول الطلاب */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t.name}</th>
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
                                                    {t.curriculum}
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleOpenModal(student)}>
                                                    <FaArchive className="me-2" />
                                                    {t.archive}
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleOpenRemoveModal(student)}>
                                                    <FaTrash className="me-2" />
                                                    {t.removeRequest}
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
            <Modal show={showModal} onHide={handleCloseModal} centered className={`modal-Archive ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaArchive className="me-2 " /> {t.archiveTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center mb-3"> {t.student} {selectedStudent?.name}</h5>
                    <Form>

                        {/* نوع التقييم */}
                        <Form.Group className="mt-3">
                            <Form.Label>{t.evaluationType}</Form.Label>
                            <Form.Select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
                                <option value="">{t.selectEvaluation}</option>
                                <option value="حفظ">حفظ</option>
                                <option value="مراجعة">مراجعة</option>
                            </Form.Select>
                        </Form.Group>

                        {/*  سبب الأرشفة */}
                        <Form.Group>
                            <Form.Label>{t.archiveReason}</Form.Label>
                            <Form.Group className="reasons">
                                <Form.Check
                                    type="radio"
                                    label={t.completed}
                                    name="archiveReason"
                                    onChange={() => setArchiveReason("تم الانتهاء")}
                                />
                                <Form.Check
                                    type="radio"
                                    label={t.evaluationError}
                                    name="archiveReason"
                                    onChange={() => setArchiveReason("خطأ في التقييم")}
                                />
                            </Form.Group>
                        </Form.Group>



                        {/* إدخال سبب الخطأ في التقييم */}
                        {archiveReason === "خطأ في التقييم" && (
                            <Form.Group className="mt-3">
                                <Form.Label>{t.enterErrorReason}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t.enterErrorReason}
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
                        {t.confirmArchive}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*  مودال إدخال سبب الإزالة */}
            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)} centered className={`modal-Remove ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                <Modal.Header closeButton>
                    <Modal.Title> <FaTrash className="me-2" /> {t.removeTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <h5 className="text-center mb-3"> {t.student} {selectedStudent?.name}</h5>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={t.enterRemoveReason}
                            value={archiveRemoveReason}
                            onChange={(e) => setArchiveRemoveReason(e.target.value)}
                        />

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="Container-StudentsList-btn" disabled={!archiveRemoveReason} onClick={handleCloseModal}>
                    {t.save}
                    </Button>

                </Modal.Footer>
            </Modal>


        </Container>
    );
};

export default StudentRecords;
