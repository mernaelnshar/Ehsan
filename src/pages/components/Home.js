import React from 'react';
import '../../styles/Home.css'; // تأكدي من وجود ملف CSS في المسار الصحيح
import { FaChalkboardTeacher, FaUserGraduate, FaVideo, FaIdCard } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    const sessions = [
        { id: 1, role: "معلم", name: 'المعلم', session: 'حلقات الحفظ الفصلية', students: 3872, time: 'من 8 إلى 10 م', type: 'الحفظ', attendance: 75, evaluation: 85 },
        { id: 2, role: "طالب", name: 'الطالب', session: 'حلقات المراجعة', students: 1200, time: 'من 6 إلى 8 م', type: 'المراجعة', attendance: 90, evaluation: 95 },
        { id: 3, role: "معلم", name: 'المعلم', session: 'حلقات التلاوة', students: 950, time: 'من 5 إلى 7 م', type: 'التلاوة', attendance: 60, evaluation: 70 },

    ];

    const navigate = useNavigate(); // لإنشاء التنقل

    const goToStudentsList = () => {
        navigate('/StudentsList'); // اسم الصفحة اللي هتروحي لها
    };
    return (
        <div className="sessionscontainer" dir="rtl">
            <div className="sessionsgrid">
                {sessions.map((session) => (
                    <div key={session.id} className="sessioncard">
                        {/* الهيدر */}
                        <div className="sessionheader">
                            <div className="teacherinfo">
                                {session.role === "معلم" ? <FaChalkboardTeacher className="icon" /> : <FaUserGraduate className="icon" />}
                                <p>{session.role}</p>
                            </div>
                            <div className="icons">
                                <FaVideo className="videoicon" />
                                <FaIdCard className="idicon"  style={{ cursor: "pointer" }} />
                            </div>
                        </div>

                        {/* تفاصيل الحلقة */}
                        <h3 className="sessiontitle">{session.session} ({session.students})</h3>

                        <div className="sessiondetails">
                            <p className="sessiontype">{session.type}</p>
                            <p className="sessiontime">{session.time}</p>
                            <p className="sessionstudents">30 <FaUserGraduate /></p>
                        </div>

                        {/* شريط الحضور */}
                        <div className="progress-section">
                            <span>الحضور</span>
                            <ProgressBar percentage={session.attendance} />
                        </div>

                        {/* شريط التقييم */}
                        <div className="progress-section">
                            <span>التقييم</span>
                            <ProgressBar percentage={session.evaluation} />
                        </div>

                        {/* زر الإجراءات */}
                        <Button className="monitoringbtn" onClick={goToStudentsList}>
                            {session.role === "معلم" ? "مراقبة الحضور" : "التقييم"}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
