import React, { useState } from "react";
import '../../styles/Home.css';
import { FaChalkboardTeacher, FaUserGraduate, FaVideo, FaIdCard } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const RatingModal = ({ show, handleClose, session }) => {
    const [hifzRating, setHifzRating] = useState(0);

    const getLabel = (rating) => {
        const labels = ["سيئ", "مقبول", "جيد", "جيد جدًا", "ممتاز"];
        return rating > 0 ? labels[rating - 1] : "لم يتم التقييم";
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>تقييم المعلم</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <div className="rating-section">
                    <p>التقييم</p>
                    <ReactStars
                        count={5}
                        value={hifzRating}
                        onChange={setHifzRating}
                        size={40}
                        activeColor="#FFD700"
                    />
                    <p className="rating-label">{getLabel(hifzRating)}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="primary" onClick={handleClose}> 
                    حفظ التقييم
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}>
                {percentage}%
            </div>
        </div>
    );
};

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const navigate = useNavigate();

    const sessions = [
        { id: 1, role: "معلم", name: 'المعلم', session: 'حلقات الحفظ الفصلية', students: 3872, time: 'من 8 إلى 10 م', type: 'الحفظ', attendance: 75, evaluation: 85 },
        { id: 2, role: "طالب", name: 'الطالب', session: 'حلقات المراجعة', students: 1200, time: 'من 6 إلى 8 م', type: 'المراجعة', attendance: 90, evaluation: 95 },
        { id: 3, role: "معلم", name: 'المعلم', session: 'حلقات التلاوة', students: 950, time: 'من 5 إلى 7 م', type: 'التلاوة', attendance: 60, evaluation: 70 },
    ];

    return (
        <div className="sessionscontainer" dir="rtl">
            <div className="sessionsgrid">
                {sessions.map((session) => (
                    <div key={session.id} className="sessioncard">
                        <div className="sessionheader">
                            <div className="teacherinfo">
                                {session.role === "معلم" ? <FaChalkboardTeacher className="icon" /> : <FaUserGraduate className="icon" />}
                                <p>{session.role}</p>
                            </div>
                            <div className="icons">
                                <FaVideo className="videoicon" />
                                <FaIdCard className="idicon" style={{ cursor: "pointer" }} onClick={() => {
                                    if (session.role === "معلم") {
                                        navigate('/StudentRecords');
                                    }
                                    else{
                                        navigate( '/ProfileTeacher');
                                    }
                                }} />
                            </div>
                        </div>

                        <h3 className="sessiontitle">{session.session} ({session.students})</h3>

                        <div className="sessiondetails">
                            <p className="sessiontype">{session.type}</p>
                            <p className="sessiontime">{session.time}</p>
                            <p className="sessionstudents">30 <FaUserGraduate /></p>
                        </div>

                        <div className="progress-section">
                            <span>الحضور</span>
                            <ProgressBar percentage={session.attendance} />
                        </div>

                        <div className="progress-section">
                            <span>التقييم</span>
                            <ProgressBar percentage={session.evaluation} />
                        </div>

                        <Button className="monitoringbtn" onClick={() => {
                            if (session.role === "معلم") {
                                navigate('/StudentsList');
                            } else {
                                setSelectedSession(session);
                                setShowModal(true);
                            }
                        }}>
                            {session.role === "معلم" ? "مراقبة الحضور" : "التقييم"}
                        </Button>
                    </div>
                ))}
            </div>

            {/* مودال التقييم */}
            {selectedSession && <RatingModal show={showModal} handleClose={() => setShowModal(false)} session={selectedSession} />}
        </div>
    );
};

export default Home;
