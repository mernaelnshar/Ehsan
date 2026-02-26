import "../../styles/Profile.css";
import { FaUser, FaEdit } from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    generalInfo: { ar: "معلومات عامة", en: "General Information" },
    username: { ar: "اسم المستخدم", en: "Username" },
    birthDate: { ar: "تاريخ الميلاد", en: "Birth Date" },
    nationalId: { ar: "رقم ID", en: "ID Number" },
    contactInfo: { ar: "معلومات الاتصال", en: "Contact Information" },
    mobileNumber: { ar: "رقم الهاتف", en: "Phone Number" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    deleteAccount: { ar: "حذف الحساب", en: "Delete Account" },
    confirmDelete: { ar: "هل أنت متأكد من انك تريد حذف الحساب؟", en: "Are you sure you want to delete your account?" },
    no: { ar: "لا", en: "No" },
    yes: { ar: "نعم", en: "Yes" },
    editContact: { ar: "تعديل بيانات الاتصال", en: "Edit Contact Information" },
    cancel: { ar: "إلغاء", en: "Cancel" },
    saveChanges: { ar: "حفظ التعديلات", en: "Save Changes" },
    accountDeleted: { ar: "تم حذف الحساب بنجاح!", en: "Account deleted successfully!" },
    errorDeleting: { ar: "حدث خطأ أثناء حذف الحساب!", en: "An error occurred while deleting the account!" },
    confirmpasswordPlaceholder: { ar: "يرجى إدخال كلمة المرور لتأكيد حذف الحساب:", en: "Please enter your password to confirm account deletion:" },
    passwordPlaceholder: { ar: "يجب إدخال كلمة المرور!", en: "Password must be entered!" },
};

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        setUserDetails({
            firstName: "Merna",
            fatherName: "Hamada",
            familyName: "Mohmoud",
            birthDate: "01-01-1990",
            nationalId: "123456789",
            mobileNumber: "01012345678",
            email: "merna@example.com"
        });
    }, []);

    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDelete = () => {
        if (window.confirm("هل أنت متأكد من حذف الحساب؟")) {
            alert("تم حذف الحساب بنجاح!");
            navigate("/login");
        }
    };

    const handleSaveChanges = () => {
        setUserDetails((prev) => ({
            ...prev,
            mobileNumber: editedPhone,
            email: editedEmail
        }));
        alert("تم تحديث البيانات بنجاح!");
        handleEditClose();
    };



    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPhone, setEditedPhone] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    useEffect(() => {
        if (userDetails) {
            setEditedPhone(userDetails.mobileNumber || "");
            setEditedEmail(userDetails.email || "");
        }
    }, [userDetails]);

    const handleEditShow = () => setShowEditModal(true);
    const handleEditClose = () => setShowEditModal(false);




    return (
        <div className={`profile-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            {userDetails ? (
                <>
                    <Container className="profile-content">
                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title className="profile-title">{texts.generalInfo[language]}</Card.Title>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.username[language]}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={`${userDetails.firstName} ${userDetails.fatherName} ${userDetails.familyName}`}
                                                    disabled
                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.birthDate[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.birthDate} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.nationalId[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.nationalId} disabled />
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
                                                <Form.Label>{texts.mobileNumber[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.mobileNumber} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.email[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.email} disabled />
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
                        <h3>{`${userDetails.firstName} ${userDetails.fatherName} ${userDetails.familyName}`}</h3>
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

                    <Modal
                        show={showEditModal}
                        onHide={handleEditClose}
                        className={`modal-edit-profile ${isArabic ? "rtl" : "ltr"}`}
                        dir={isArabic ? "rtl" : "ltr"}
                        centered
                    >
                        <Modal.Body className="modal-content">
                            <h3>{texts.editContact[language]}</h3>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>{texts.mobileNumber[language]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedPhone}
                                        onChange={(e) => setEditedPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>{texts.email[language]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            <Modal.Footer>
                                <Button className="btn cancel-btn" onClick={handleEditClose}>
                                    {texts.cancel[language]}
                                </Button>
                                <Button className="btn save-btn" onClick={handleSaveChanges}>
                                    {texts.saveChanges[language]}
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal>



                </>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}


        </div>
    );
};

export default Profile;
