import React, { useState } from "react";
import { Card, Alert, Container, Row, Col, Form } from "react-bootstrap";
import '../../styles/EducationalPlan.css';

const EducationalPlan = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const parts = [
        { id: 1, name: "الجزء الأول", duration: "30 يوم" },
        { id: 2, name: "الجزء الثاني", duration: "25 يوم" },
        { id: 3, name: "الجزء الثالث", duration: "20 يوم" },

    ];

    const handleSelect = (id, option) => {
        setSelectedOptions((prev) => ({ ...prev, [id]: { ...prev[id], [option]: true } }));
    };

    const handleDeselect = (id, option) => {
        setShowAlert(true); // عرض التنبيه
    };

    return (
        <Container className="educational-container" dir="rtl" >
            <h2 className="text-center mb-4 educational-title">📖 المنهج التعليمي</h2>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    ⚠ لا يمكن إلغاء الاختيار! يجب إزالته من الأرشيف.
                </Alert>
            )}
            <Row>
                {parts.map((part) => (
                    <Col md={4} key={part.id} className="educational-cards">
                        <Card className="mb-3 educational-card ">
                            <Card.Body>
                                <Card.Title className="text-center">{part.name}</Card.Title>
                                <Card.Text className="plan-duration" >⏳ مدة الخطة: {part.duration}</Card.Text>
                                <Form.Group className="options">
                                <Form.Check
                                    type="checkbox"
                                    label="مراجعة صغرى"
                                    checked={selectedOptions[part.id]?.revision || false}
                                    onChange={(e) =>
                                        e.target.checked ? handleSelect(part.id, "revision") : handleDeselect(part.id, "revision")
                                    }
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="حفظ"
                                    checked={selectedOptions[part.id]?.memorization || false}
                                    onChange={(e) =>
                                        e.target.checked ? handleSelect(part.id, "memorization") : handleDeselect(part.id, "memorization")
                                    }
                                />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EducationalPlan;
