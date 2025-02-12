import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import '../../styles/AddNewHifzReview.css';
import { useLocation , useNavigate } from "react-router-dom";

const surahs = [
    { value: 'البقرة', label: 'البقرة', ayahCount: 286 },
    { value: 'آل عمران', label: 'آل عمران', ayahCount: 200 },
    { value: 'النساء', label: 'النساء', ayahCount: 176 },
    { value: 'المائدة', label: 'المائدة', ayahCount: 120 },
    { value: 'الأنعام', label: 'الأنعام', ayahCount: 165 }
];


function AddNewHifzReview() {
    const location = useLocation();
    const sectionTitle = location.state?.sectionTitle || "إضافة حفظ أو مراجعة جديدة";


    const [selectedSurah, setSelectedSurah] = useState(null);
    const [ayahOptions, setAyahOptions] = useState([]);

    const handleSurahChange = (selectedOption) => {
        setSelectedSurah(selectedOption);
        if (selectedOption) {
            const ayahs = Array.from({ length: selectedOption.ayahCount }, (_, i) => ({
                value: i + 1,
                label: `الآية ${i + 1}`
            }));
            setAyahOptions(ayahs);
        } else {
            setAyahOptions([]);
        }
    };

    const navigate = useNavigate(); // لإنشاء التنقل
    
        const goToStudentEvaluation = () => {
            navigate("/StudentEvaluation");
        }

    return (
        <div className="add-hifz-review" dir='rtl'>
            <h2>{sectionTitle}</h2>

            <div className="selection-section">
                <label>اختر السورة:</label>
                <Select options={surahs} onChange={handleSurahChange} className='custom-select' />
            </div>

            <div className="selection-section">
                {selectedSurah && (
                    <>
                        <label>من الآية:</label>
                        <Select options={ayahOptions} className='custom-select' />


                    </>
                )}
            </div>

            <div className="selection-section">
                <label>اختر السورة:</label>
                <Select options={surahs} onChange={handleSurahChange} className='custom-select' />
            </div>

            <div className="selection-section">
                {selectedSurah && (
                    <>


                        <label>إلى الآية:</label>
                        <Select options={ayahOptions} className='custom-select' />
                    </>
                )}
            </div>



            <Button className="save-button" disabled={!selectedSurah || !ayahOptions} onClick={goToStudentEvaluation}>
                حفظ
            </Button>
        </div>
    );
}

export default AddNewHifzReview;
