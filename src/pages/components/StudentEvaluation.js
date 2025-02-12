import React, { useState } from 'react';
import '../../styles/StudentEvaluation.css';
import { FaPlusSquare, FaCheckSquare } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function StudentEvaluation() {
    const [hifzRating, setHifzRating] = useState(0);
    const [murajaRating, setMurajaRating] = useState(0);

    const getLabel = (value) => {
        switch (value) {
            case 5: return "ممتاز 🌟";
            case 4: return "جيد جدًا 👍";
            case 3: return "جيد 🙂";
            case 2: return "مقبول 🤷‍♂️";
            case 1: return "ضعيف ❌";
            default: return "لم يتم التقييم بعد";
        }
    };

    const navigate = useNavigate();

    // ✅ تحميل الحالة من localStorage عند تحميل الصفحة
    const [clickedSection, setClickedSection] = useState(
        localStorage.getItem("clickedSection") || null
    );

    const goToAddNewHifzReview = (sectionTitle) => {
        setClickedSection(sectionTitle);
        localStorage.setItem("clickedSection", sectionTitle); // ✅ حفظ في localStorage
        navigate("/AddNewHifzReview", { state: { sectionTitle } });
    };

    return (
        <div className="student-evaluation" dir='rtl'>
            <h1 className='student-evaluation-title'>التقييم والمتابعة</h1>

            <div className='sections d-flex'>
                {/* قسم الحفظ */}
                <div className="evaluation-section ">
                    <div className="section-header">
                        <h2>الحفظ</h2>
                        {clickedSection === "الحفظ" ? (
                            <FaCheckSquare className="plus-box-icon checked" /> // أيقونة الصح
                        ) : (
                            <FaPlusSquare
                                className="plus-box-icon"
                                onClick={() => goToAddNewHifzReview("الحفظ")}
                            />
                        )}
                    </div>
                    <div className="evaluation-content ">
                        <p>من: <span>المجادلة</span></p>
                        <p>
                            قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي  زَوْجِهَا وَتَشْتَكِي إِلَى اللَّهِ وَاللَّهُ يَسْمَعُ تَحَاوُرَكُمَا  إِنَّ اللَّهَ سَمِيعٌ بَصِيرٌ
                        </p>
                    </div>
                    <div className="evaluation-content">
                        <p>إلى: <span>المجادلة</span></p>
                        <p>
                            أَلَمْ تَرَ أَنَّ اللَّهَ يَعْلَمُ مَا فِي السَّمَاوَاتِ  وَمَا فِي الأَرْضِ مَا يَكُونُ مِن نَّجْوَى ثَلاثَةٍ إِلاَّ هُوَ  رَابِعُهُمْ وَلا خَمْسَةٍ إِلاَّ هُوَ سَادِسُهُمْ وَلا أَدْنَى مِن  ذَلِكَ وَلا أَكْثَرَ إِلاَّ هُوَ مَعَهُمْ أَيْنَ مَا كَانُوا ثُمَّ  يُنَبِّئُهُم بِمَا عَمِلُوا يَوْمَ الْقِيَامَةِ إِنَّ اللَّهَ بِكُلِّ  شَيْءٍ عَلِيمٌ
                        </p>
                    </div>
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
                </div>

                {/* قسم المراجعة */}
                <div className="evaluation-section">
                    <div className="section-header">
                        <h2>المراجعة</h2>
                        {clickedSection === "المراجعة" ? (
                            <FaCheckSquare className="plus-box-icon checked" /> // أيقونة الصح
                        ) : (
                            <FaPlusSquare
                                className="plus-box-icon"
                                onClick={() => goToAddNewHifzReview("المراجعة")}
                            />
                        )}                 
                    </div>

                    <div className="evaluation-content">
                        <p>من: <span>الطلاق</span></p>
                        <p>
                            يَا أَيُّهَا النَّبِيُّ إِذَا طَلَّقْتُمُ النِّسَاء  فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ وَأَحْصُوا الْعِدَّةَ وَاتَّقُوا اللَّهَ  رَبَّكُمْ لا تُخْرِجُوهُنَّ مِن بُيُوتِهِنَّ وَلا يَخْرُجْنَ إِلاَّ أَن  يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ وَتِلْكَ حُدُودُ اللَّهِ وَمَن  يَتَعَدَّ حُدُودَ اللَّهِ فَقَدْ ظَلَمَ نَفْسَهُ لا تَدْرِي لَعَلَّ  اللَّهَ يُحْدِثُ بَعْدَ ذَلِكَ أَمْرًا                        </p>
                    </div>
                    <div className="evaluation-content">
                        <p>إلى: <span>التحريم</span></p>
                        <p>
                            يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ  وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا  مَلائِكَةٌ غِلاظٌ شِدَادٌ لا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ  وَيَفْعَلُونَ مَا يُؤْمَرُونَ                        </p>
                    </div>
                    <div className="rating-section">
                        <p>التقييم</p>
                        <ReactStars
                            count={5}
                            value={murajaRating}
                            onChange={setMurajaRating}
                            size={40}
                            activeColor="#FFD700"
                        />
                        <p className="rating-label">{getLabel(murajaRating)}</p>
                    </div>
                </div>
            </div>

            <Button className="save-button w-25" onClick={() =>navigate("/StudentsList")}>حفظ</Button>
        </div>
    );
}

export default StudentEvaluation;
