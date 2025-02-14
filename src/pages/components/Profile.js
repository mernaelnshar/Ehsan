import "../../styles/Profile.css";
import { FaUser, FaEdit } from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    generalInfo: { ar: "معلومات عامة", en: "General Information" },
    username: { ar: "اسم المستخدم", en: "Username" },
    birthDate: { ar: "تاريخ الميلاد", en: "Birth Date" },
    idNumber: { ar: "رقم ID", en: "ID Number" },
    contactInfo: { ar: "معلومات الاتصال", en: "Contact Information" },
    phoneNumber: { ar: "رقم الهاتف", en: "Phone Number" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    deleteAccount: { ar: "حذف الحساب", en: "Delete Account" },
    confirmDelete: { ar: "هل أنت متأكد من انك تريد حذف الحساب؟", en: "Are you sure you want to delete your account?" },
    no: { ar: "لا", en: "No" },
    yes: { ar: "نعم", en: "Yes" },
    editContact: { ar: "تعديل بيانات الاتصال", en: "Edit Contact Information" },
    cancel: { ar: "إلغاء", en: "Cancel" },
    saveChanges: { ar: "حفظ التعديلات", en: "Save Changes" },
    accountDeleted: { ar: "تم حذف الحساب بنجاح!", en: "Account deleted successfully!" }
};

const Profile = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDelete = () => {
        alert(texts.accountDeleted[language]);
        navigate("/login");
    };

    const [user, setUser] = useState({
        id: "S204050",
        birthDate: "14-5-2003",
        name: "ميرنا حماده حنفي",
        phone: "+201478523695",
        email: "email@gmail.com",
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPhone, setEditedPhone] = useState(user.phone);
    const [editedEmail, setEditedEmail] = useState(user.email);

    const handleEditShow = () => setShowEditModal(true);
    const handleEditClose = () => setShowEditModal(false);

    const handleSaveChanges = () => {
        setUser({ ...user, phone: editedPhone, email: editedEmail });
        handleEditClose();
    };

    return (
        <div className={`profile-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <Container className="profile-content">
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-title">{texts.generalInfo[language]}</Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{texts.username[language]}</Form.Label>
                                        <Form.Control type="text" value={user.name} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{texts.birthDate[language]}</Form.Label>
                                        <Form.Control type="text" value={user.birthDate} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{texts.idNumber[language]}</Form.Label>
                                        <Form.Control type="text" value={user.id} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-title">
                            {texts.contactInfo[language]} <FaEdit className="edit-icon" onClick={handleEditShow} />
                        </Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{texts.phoneNumber[language]}</Form.Label>
                                        <Form.Control type="text" value={user.phone} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>{texts.email[language]}</Form.Label>
                                        <Form.Control type="text" value={user.email} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <Button className="del-btn" onClick={handleShow}>
                    {texts.deleteAccount[language]}
                </Button>
            </Container>

            <Container className="profile-image">
                <FaUser size={100} className="user-icon" />
                <h3>{user.name}</h3>
            </Container>

            <Modal show={showModal} onHide={handleClose} className={`modal-delet-profile ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"} centered>
                <Modal.Body className="modal-content">
                    <h3>{texts.confirmDelete[language]}</h3>
                    <Modal.Footer>
                        <Button className="btn cancel-btn" onClick={handleClose}>{texts.no[language]}</Button>
                        <Button className="btn confirm-btn" onClick={handleDelete}>{texts.yes[language]}</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleEditClose} className={`modal-edit-profile ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"} centered>
                <Modal.Body className="modal-content">
                    <h3>{texts.editContact[language]}</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{texts.phoneNumber[language]}</Form.Label>
                            <Form.Control type="text" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{texts.email[language]}</Form.Label>
                            <Form.Control type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button className="btn cancel-btn" onClick={handleEditClose}>{texts.cancel[language]}</Button>
                        <Button className="btn save-btn" onClick={handleSaveChanges}>{texts.saveChanges[language]}</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
