import "../../styles/Profile.css";
import { FaUser} from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileStudent = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // ✅ استخدام useNavigate

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleReport = () => {
        alert("تم الإبلاغ بنجاح!");
        navigate("/StudentRecords"); // ✅ الانتقال لصفحة تسجيل الدخول بدون إعادة تحميل
    };

    const [user] = useState({
        id: "S204050",
        birthDate: "14-5-2003",
        name: "ميرنا حماده حنفي",
        phone: "+201478523695",
        email: "email@gmail.com",
    });

    return (
        <div className="profile-container ">
            <Container className="profile-content me-5">
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
                            معلومات الاتصال
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

                <Button className="del-btn w-25" onClick={handleShow}>
                    إبلاغ
                </Button>
            </Container>

            <Container className="profile-image me-5">
                <FaUser size={100} className="user-icon" />
                <h3>{user.name}</h3>
            </Container>

            {/*  مودال إدخال سبب الابلاغ */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>إدخال سبب اللإبلاغ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>يرجى كتابة سبب اللإبلاغ</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="اكتب السبب هنا"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className="Container-StudentsList-btn">
                        إلغاء
                    </Button>
                    <Button onClick={handleReport} className="Container-StudentsList-btn">
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default ProfileStudent;
