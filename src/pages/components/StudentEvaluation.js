import React, { useState } from 'react';
import '../../styles/StudentEvaluation.css'
import { FaPlusSquare } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Button } from 'react-bootstrap';
function StudentEvaluation() {

    const [rating, setRating] = useState(0);

    const getLabel = (value) => {
        if (value === 5) return "ممتاز 🌟";
        if (value === 4) return "جيد جدًا 👍";
        if (value === 3) return "جيد 🙂";
        if (value === 2) return "مقبول 🤷‍♂️";
        if (value === 1) return "ضعيف ❌";
        return "لم يتم التقييم بعد";
    };

    return (
        <div>
            <h2>التقييم و المتابعة</h2>
            <div>
                <div>
                    <h2>الحفظ</h2>
                    <FaPlusSquare className="plus-box-icon" />
                </div>
                <div>
                    <p>من : <span>الطلاق</span></p>
                    <p>يَا أَيُّهَا النَّبِيُّ إِذَا طَلَّقْتُمُ النِّسَاء  فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ وَأَحْصُوا الْعِدَّةَ وَاتَّقُوا اللَّهَ  رَبَّكُمْ لا تُخْرِجُوهُنَّ مِن بُيُوتِهِنَّ وَلا يَخْرُجْنَ إِلاَّ أَن  يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ وَتِلْكَ حُدُودُ اللَّهِ وَمَن  يَتَعَدَّ حُدُودَ اللَّهِ فَقَدْ ظَلَمَ نَفْسَهُ لا تَدْرِي لَعَلَّ  اللَّهَ يُحْدِثُ بَعْدَ ذَلِكَ أَمْرًا</p>
                </div>

                <div>
                    <p>الي : <span>التحريم</span></p>
                    <p>يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ  وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا  مَلائِكَةٌ غِلاظٌ شِدَادٌ لا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ  وَيَفْعَلُونَ مَا يُؤْمَرُونَ</p>
                </div>
                <div>
                    <p>التقييم</p>
                    <ReactStars
                        count={5}
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
                        size={40}
                        activeColor="#FFD700"
                    />
                    <p className="rating-label">{getLabel(rating)}</p>
                </div>
            </div>
            <div>
                <div>
                    <h2>المراجعة</h2>
                    <FaPlusSquare className="plus-box-icon" />
                </div>
                <div>
                    <p>من : <span>الطلاق</span></p>
                    <p>يَا أَيُّهَا النَّبِيُّ إِذَا طَلَّقْتُمُ النِّسَاء  فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ وَأَحْصُوا الْعِدَّةَ وَاتَّقُوا اللَّهَ  رَبَّكُمْ لا تُخْرِجُوهُنَّ مِن بُيُوتِهِنَّ وَلا يَخْرُجْنَ إِلاَّ أَن  يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ وَتِلْكَ حُدُودُ اللَّهِ وَمَن  يَتَعَدَّ حُدُودَ اللَّهِ فَقَدْ ظَلَمَ نَفْسَهُ لا تَدْرِي لَعَلَّ  اللَّهَ يُحْدِثُ بَعْدَ ذَلِكَ أَمْرًا</p>
                </div>

                <div>
                    <p>الي : <span>التحريم</span></p>
                    <p>يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ  وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا  مَلائِكَةٌ غِلاظٌ شِدَادٌ لا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ  وَيَفْعَلُونَ مَا يُؤْمَرُونَ</p>
                </div>
                <div>
                    <p>التقييم</p>
                    <ReactStars
                        count={5}
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
                        size={40}
                        activeColor="#FFD700"
                    />
                    <p className="rating-label">{getLabel(rating)}</p>
                </div>
            </div>
            <Button>حفظ</Button>
        </div>

    );
}

export default StudentEvaluation;
