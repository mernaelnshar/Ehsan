import React, { useState, useContext, useEffect } from 'react';
import '../../styles/StudentEvaluation.css';
import { FaPlusSquare, FaCheckSquare } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";
import { soraName, ayaText, loadQuranJson , ayaFromPos } from '../../services/quranJsonService';  

const texts = {
    ar: {
        title: "التقييم والمتابعة",
        hifz: "الحفظ",
        muraja: "المراجعة",
        from: "من:",
        to: "إلى:",
        rating: "التقييم",
        save: "حفظ",
        labels: ["لم يتم التقييم بعد", "ضعيف ❌", "مقبول 🤷‍♂️", "جيد 🙂", "جيد جدًا 👍", "ممتاز 🌟"]
    },
    en: {
        title: "Evaluation & Follow-up",
        hifz: "Hifz",
        muraja: "Revision",
        from: "From:",
        to: "To:",
        rating: "Rating",
        save: "Save",
        labels: ["Not rated yet", "Weak ❌", "Acceptable 🤷‍♂️", "Good 🙂", "Very Good 👍", "Excellent 🌟"]
    }
};

function StudentEvaluation() {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = texts[language];

    const [hifzRating, setHifzRating] = useState(0);
    const [murajaRating, setMurajaRating] = useState(0);
    const [quranDataLoaded, setQuranDataLoaded] = useState(false);

    const [selectedHifzData, setSelectedHifzData] = useState(
        JSON.parse(localStorage.getItem("selectedHifzData")) || {}
    );

    const getLabel = (value) => t.labels[value] || t.labels[0];

    const navigate = useNavigate();
    const [clickedSection, setClickedSection] = useState(localStorage.getItem("clickedSection") || null);

    useEffect(() => {
        loadQuranJson().then(() => setQuranDataLoaded(true));
    }, []);

    const goToAddNewHifzReview = (sectionTitle) => {
    localStorage.setItem("clickedSection", sectionTitle);
    navigate("/AddNewHifzReview", { state: { sectionTitle} });
    };

    const renderAyah = (sora, aya) => {
        const soraNumber = parseInt(sora);
        const ayaNumber = parseInt(aya);
        const ayaId = ayaFromPos(soraNumber, ayaNumber);
        const soraN = soraName(ayaId);
        const ayaTextContent = ayaText(ayaId);
        return `📖 **${soraN}** - (${ayaNumber})\n${ayaTextContent}`;
    };

    return (
        <div className={`student-evaluation ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h1 className='student-evaluation-title'>{t.title}</h1>
            <div className='sections d-flex'>
                <div className="evaluation-section">
                    <div className="section-header">
                        <h2>{t.hifz}</h2>
                        {clickedSection === "الحفظ" ? (
                            <FaCheckSquare className="plus-box-icon checked" />
                        ) : (
                            <FaPlusSquare className="plus-box-icon" onClick={() => goToAddNewHifzReview(t.hifz)} />
                        )}
                    </div>
                    {clickedSection === "الحفظ" && quranDataLoaded && selectedHifzData.fromSurah && selectedHifzData.fromAyah && (
                        <>
                            <div className="evaluation-content">
                                <p>{t.from} {renderAyah(selectedHifzData.fromSurah.value, selectedHifzData.fromAyah.value)}</p>
                            </div>
                            <div className="evaluation-content">
                                <p>{t.to} {renderAyah(selectedHifzData.toSurah.value, selectedHifzData.toAyah.value)}</p>
                            </div>
                        </>
                    )}
                    <div className="rating-section">
                        <p>{t.rating}</p>
                        <ReactStars count={5} value={hifzRating} onChange={setHifzRating} size={40} activeColor="#FFD700" />
                        <p className="rating-label">{getLabel(hifzRating)}</p>
                    </div>
                </div>

                <div className="evaluation-section">
                    <div className="section-header">
                        <h2>{t.muraja}</h2>
                        {clickedSection === "المراجعة" ? (
                            <FaCheckSquare className="plus-box-icon checked" />
                        ) : (
                            <FaPlusSquare className="plus-box-icon" onClick={() => goToAddNewHifzReview(t.muraja)} />
                        )}
                    </div>
                    {clickedSection === "المراجعة" && quranDataLoaded && selectedHifzData.fromSurah && selectedHifzData.fromAyah && (
                        <>
                            <div className="evaluation-content">
                                <p>{t.from} {renderAyah(selectedHifzData.fromSurah.value, selectedHifzData.fromAyah.value)}</p>
                            </div>
                            <div className="evaluation-content">
                                <p>{t.to} {renderAyah(selectedHifzData.toSurah.value, selectedHifzData.toAyah.value)}</p>
                            </div>
                        </>
                    )}
                    <div className="rating-section">
                        <p>{t.rating}</p>
                        <ReactStars count={5} value={murajaRating} onChange={setMurajaRating} size={40} activeColor="#FFD700" />
                        <p className="rating-label">{getLabel(murajaRating)}</p>
                    </div>
                </div>
            </div>
            <Button className="save-button w-25" onClick={() => navigate("/StudentsList")}>{t.save}</Button>
        </div>
    );
}

export default StudentEvaluation;