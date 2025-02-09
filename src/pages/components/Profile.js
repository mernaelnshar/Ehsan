import "../../styles/Profile.css";
import { FaUser, FaEdit } from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ استيراد useNavigate

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // ✅ استخدام useNavigate

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDelete = () => {
        alert("تم حذف الحساب بنجاح!");
        navigate("/login"); // ✅ الانتقال لصفحة تسجيل الدخول بدون إعادة تحميل
    };

    const [user,setUser] = useState( {
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
        <div className="profile-container">
            <Container className="profile-content">
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-title">معلومات عامة</Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>اسم المستخدم</Form.Label>
                                        <Form.Control type="text" value={user.name} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>تاريخ الميلاد</Form.Label>
                                        <Form.Control type="text" value={user.birthDate} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>رقم ID</Form.Label>
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
                            معلومات الاتصال <FaEdit className="edit-icon" onClick={handleEditShow} />
                        </Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>رقم الهاتف</Form.Label>
                                        <Form.Control type="text" value={user.phone} disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>البريد الإلكتروني</Form.Label>
                                        <Form.Control type="text" value={user.email} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                <Button className="del-btn" onClick={handleShow}>
                    حذف الحساب
                </Button>
            </Container>

            <Container className="profile-image">
                <FaUser size={100} className="user-icon" />
                <h3>{user.name}</h3>
            </Container>

            {/* 🔹 مودال حذف الحساب */}
            <Modal show={showModal} onHide={handleClose} className="modal-delet-profile" centered>
                <Modal.Body className="modal-content">
                    <h3>هل أنت متأكد من انك تريد حذف الحساب؟</h3>
                    <Modal.Footer>
                        <Button className="btn cancel-btn" onClick={handleClose}>
                            لا
                        </Button>
                        <Button className="btn confirm-btn" onClick={handleDelete}>
                            نعم
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            {/* 🔹 مودال تعديل بيانات الاتصال */}
            <Modal show={showEditModal} onHide={handleEditClose} className="modal-edit-profile" centered>
                <Modal.Body className="modal-content">
                    <h3>تعديل بيانات الاتصال</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>رقم الهاتف</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>البريد الإلكتروني</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button className="btn cancel-btn" onClick={handleEditClose}>
                            إلغاء
                        </Button>
                        <Button className="btn save-btn" onClick={handleSaveChanges}>
                            حفظ التعديلات
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
