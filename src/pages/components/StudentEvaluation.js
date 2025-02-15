import React, { useState, useContext } from 'react';
import '../../styles/StudentEvaluation.css';
import { FaPlusSquare, FaCheckSquare } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";

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
        hifz: "Memorization",
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

    const getLabel = (value) => t.labels[value] || t.labels[0];

    const navigate = useNavigate();
    const [clickedSection, setClickedSection] = useState(localStorage.getItem("clickedSection") || null);

    const goToAddNewHifzReview = (sectionTitle) => {
        setClickedSection(sectionTitle);
        localStorage.setItem("clickedSection", sectionTitle);
        navigate("/AddNewHifzReview", { state: { sectionTitle } });
    };

    return (
        <div className={`student-evaluation ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h1 className='student-evaluation-title'>{t.title}</h1>

            <div className='sections d-flex'>
                {/* قسم الحفظ */}
                <div className="evaluation-section ">
                    <div className="section-header">
                        <h2>{t.hifz}</h2>
                        {clickedSection === t.hifz ? (
                            <FaCheckSquare className="plus-box-icon checked" />
                        ) : (
                            <FaPlusSquare className="plus-box-icon" onClick={() => goToAddNewHifzReview(t.hifz)} />
                        )}
                    </div>
                    <div className="evaluation-content ">
                        <p> {t.from} <span>المجادلة</span></p>
                        <p>
                            قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي  زَوْجِهَا وَتَشْتَكِي إِلَى اللَّهِ وَاللَّهُ يَسْمَعُ تَحَاوُرَكُمَا  إِنَّ اللَّهَ سَمِيعٌ بَصِيرٌ
                        </p>
                    </div>
                    <div className="evaluation-content">
                        <p>{t.to}<span>المجادلة</span></p>
                        <p>
                            أَلَمْ تَرَ أَنَّ اللَّهَ يَعْلَمُ مَا فِي السَّمَاوَاتِ  وَمَا فِي الأَرْضِ مَا يَكُونُ مِن نَّجْوَى ثَلاثَةٍ إِلاَّ هُوَ  رَابِعُهُمْ وَلا خَمْسَةٍ إِلاَّ هُوَ سَادِسُهُمْ وَلا أَدْنَى مِن  ذَلِكَ وَلا أَكْثَرَ إِلاَّ هُوَ مَعَهُمْ أَيْنَ مَا كَانُوا ثُمَّ  يُنَبِّئُهُم بِمَا عَمِلُوا يَوْمَ الْقِيَامَةِ إِنَّ اللَّهَ بِكُلِّ  شَيْءٍ عَلِيمٌ
                        </p>
                    </div>
                    <div className="rating-section">
                        <p>{t.rating}</p>
                        <ReactStars count={5} value={hifzRating} onChange={setHifzRating} size={40} activeColor="#FFD700" />
                        <p className="rating-label">{getLabel(hifzRating)}</p>
                    </div>
                </div>

                {/* قسم المراجعة */}
                <div className="evaluation-section">
                <div className="section-header">
                        <h2>{t.muraja}</h2>
                        {clickedSection === t.muraja ? (
                            <FaCheckSquare className="plus-box-icon checked" />
                        ) : (
                            <FaPlusSquare className="plus-box-icon" onClick={() => goToAddNewHifzReview(t.muraja)} />
                        )}                 
                    </div>

                    <div className="evaluation-content">
                        <p>{t.from} <span>الطلاق</span></p>
                        <p>
                            يَا أَيُّهَا النَّبِيُّ إِذَا طَلَّقْتُمُ النِّسَاء  فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ وَأَحْصُوا الْعِدَّةَ وَاتَّقُوا اللَّهَ  رَبَّكُمْ لا تُخْرِجُوهُنَّ مِن بُيُوتِهِنَّ وَلا يَخْرُجْنَ إِلاَّ أَن  يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ وَتِلْكَ حُدُودُ اللَّهِ وَمَن  يَتَعَدَّ حُدُودَ اللَّهِ فَقَدْ ظَلَمَ نَفْسَهُ لا تَدْرِي لَعَلَّ  اللَّهَ يُحْدِثُ بَعْدَ ذَلِكَ أَمْرًا                        </p>
                    </div>
                    <div className="evaluation-content">
                        <p>{t.to}<span>التحريم</span></p>
                        <p>
                            يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ  وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا  مَلائِكَةٌ غِلاظٌ شِدَادٌ لا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ  وَيَفْعَلُونَ مَا يُؤْمَرُونَ                        </p>
                    </div>
                    <div className="rating-section">
                        <p>{t.rating}</p>
                        <ReactStars count={5} value={murajaRating} onChange={setMurajaRating} size={40} activeColor="#FFD700" />
                        <p className="rating-label">{getLabel(murajaRating)}</p>
                    </div>
                </div>
            </div>

            <Button className="save-button w-25" onClick={() => navigate("/StudentsList")}>{t.save}</Button>        </div>
    );
}

export default StudentEvaluation;
