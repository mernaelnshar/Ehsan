import React, { useState, useContext } from "react";
import { Card, Alert, Container, Row, Col, Form } from "react-bootstrap";
import '../../styles/EducationalPlan.css';
import { LanguageContext } from "../../context/LanguageContext";

const texts = {
    en: {
        title: "📖 Educational Plan",
        duration: "⏳ Plan Duration:",
        alertMessage: "⚠ Selection cannot be canceled! It must be removed from the archive."
    },
    ar: {
        title: "📖 المنهج التعليمي",
        duration: "⏳ مدة الخطة:",
        alertMessage: "⚠ لا يمكن إلغاء الاختيار! يجب إزالته من الأرشيف."
    }
};

const EducationalPlan = () => {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = texts[language];
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const parts = [
        { id: 1, name: isArabic ? "الجزء الأول" : "Part 1", duration: isArabic ? "30 يوم" : "30 Days" },
        { id: 2, name: isArabic ? "الجزء الثاني" : "Part 2", duration: isArabic ? "25 يوم" : "25 Days" },
        { id: 3, name: isArabic ? "الجزء الثالث" : "Part 3", duration: isArabic ? "20 يوم" : "20 Days" },
    ];

    const handleSelect = (id, option) => {
        setSelectedOptions((prev) => ({ ...prev, [id]: { ...prev[id], [option]: true } }));
    };

    const handleDeselect = (id, option) => {
        setShowAlert(true); // عرض التنبيه
    };

    return (
        <Container className={`educational-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h2 className="text-center mb-4 educational-title">{t.title}</h2>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {t.alertMessage}
                </Alert>
            )}
            <Row>
                {parts.map((part) => (
                    <Col md={4} key={part.id} className="educational-cards">
                        <Card className="mb-3 educational-card">
                            <Card.Body>
                                <Card.Title className="text-center">{part.name}</Card.Title>
                                <Card.Text className="plan-duration">{t.duration} {part.duration}</Card.Text>
                                <Form.Group className="options">
                                    <Form.Check
                                        type="checkbox"
                                        label="مراجعة صغري"
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
