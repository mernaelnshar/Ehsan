import "../../styles/Profile.css";
import { FaUser } from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    en: {
        generalInfo: "General Information",
        username: "Username",
        birthDate: "Birth Date",
        idNumber: "ID Number",
        contactInfo: "Contact Information",
        phoneNumber: "Phone Number",
        email: "Email",
        report: "Report",
        enterReportReason: "Enter Report Reason",
        writeReason: "Please write the reason for the report",
        cancel: "Cancel",
        save: "Save",
        reportSuccess: "Report submitted successfully!",
    },
    ar: {
        generalInfo: "معلومات عامة",
        username: "اسم المستخدم",
        birthDate: "تاريخ الميلاد",
        idNumber: "رقم ID",
        contactInfo: "معلومات الاتصال",
        phoneNumber: "رقم الهاتف",
        email: "البريد الإلكتروني",
        report: "إبلاغ",
        enterReportReason: "إدخال سبب الإبلاغ",
        writeReason: "يرجى كتابة سبب الإبلاغ",
        cancel: "إلغاء",
        save: "حفظ",
        reportSuccess: "تم الإبلاغ بنجاح!",
    }
};

const ProfileStudent = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = texts[language];
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleReport = () => {
        alert(t.reportSuccess);
        navigate("/StudentRecords");
    };

    const [user] = useState({
        id: "S204050",
        birthDate: "14-5-2003",
        name: "ميرنا حماده حنفي",
        phone: "+201478523695",
        email: "email@gmail.com",
    });

    return (
        <div className={`profile-container   ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <Container className="profile-content ">
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-title">{t.generalInfo}</Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{t.username}</Form.Label>
                                        <Form.Control type="text" value={user.name} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{t.birthDate}</Form.Label>
                                        <Form.Control type="text" value={user.birthDate} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{t.idNumber}</Form.Label>
                                        <Form.Control type="text" value={user.id} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-title">{t.contactInfo}</Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{t.phoneNumber}</Form.Label>
                                        <Form.Control type="text" value={user.phone} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{t.email}</Form.Label>
                                        <Form.Control type="text" value={user.email} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <Button className="del-btn w-25" onClick={handleShow}>{t.report}</Button>
            </Container>

            <Container className="profile-image me-5">
                <FaUser size={100} className="user-icon" />
                <h3>{user.name}</h3>
            </Container>

            {/*  مودال إدخال سبب الإبلاغ */}
            <Modal show={showModal} onHide={handleClose} centered className={`modal-Report ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
                <Modal.Header closeButton>
                    <Modal.Title>{t.enterReportReason}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{t.writeReason}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={t.writeReason} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className="Container-StudentsList-btn">{t.cancel}</Button>
                    <Button onClick={handleReport} className="Container-StudentsList-btn">{t.save}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileStudent;
