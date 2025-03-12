import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import '../../styles/AddNewHifzReview.css';
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { getSowarList, getTranslatedText, resetSelections, updateAyahOptions } from '../../services/quranJsonService';

function AddNewHifzReview() {
    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const t = getTranslatedText(language);
    const location = useLocation();
    const navigate = useNavigate();
    const sectionTitle = location.state?.sectionTitle || t.sectionTitle;

    // السورة الأولى
    const [selectedSurah1, setSelectedSurah1] = useState(null);
    const [fromAyahOptions1, setFromAyahOptions1] = useState([]);
    const [selectedFromAyah, setSelectedFromAyah] = useState(null);

    // السورة الثانية
    const [selectedSurah2, setSelectedSurah2] = useState(null);
    const [toAyahOptions2, setToAyahOptions2] = useState([]);
    const [selectedToAyah, setSelectedToAyah] = useState(null);
    const [toSurahOptions, setToSurahOptions] = useState([]);

    const surahOptions = getSowarList('1-6238');
    // تغيير السورة الأولى وتحديث الآيات
    
    const handleSurah1Change = (selectedOption) => {
        if (!selectedOption) return;
        setSelectedSurah1(selectedOption);
        resetSelections(
            setFromAyahOptions1,
            setSelectedFromAyah,
            setSelectedSurah2,
            setToAyahOptions2,
            setSelectedToAyah
        );
    
        const surahNumber = parseInt(selectedOption.value, 10);
        if (isNaN(surahNumber)) {
            console.error("القيمة غير صالحة للسورة: ", selectedOption.value);
            return;
        }
    
        updateAyahOptions(surahNumber, setFromAyahOptions1);
    
        // تحديث قائمة السور المتاحة في "إلى سورة"
        const allSurahOptions = getSowarList('1-6238');
        const filteredSurahOptions = allSurahOptions.filter(
            (surah) => parseInt(surah.value, 10) >= surahNumber
        );
        
        setToSurahOptions(filteredSurahOptions);
    };
    
    //  الآية الأولى وتحديث السورة الثانية
    const handleFromAyahChange = (selectedOption) => {
        setSelectedFromAyah(selectedOption);
        resetSelections(
            () => { }, // دالة فارغة بدلاً من setFromAyahOptions1
            () => { }, // دالة فارغة بدلاً من setSelectedFromAyah
            setSelectedSurah2,
            setToAyahOptions2,
            setSelectedToAyah
        );
    };

    // تغيير السورة الثانية وتحديث الآيات
    const handleSurah2Change = (selectedOption) => {
        setSelectedSurah2(selectedOption);
        resetSelections(
            () => { },
            () => { },
            null,
            setToAyahOptions2,
            setSelectedToAyah
        );

        if (selectedOption) {
            const surahNumber = parseInt(selectedOption.value);
            const startAyah = (selectedSurah1?.value === selectedOption.value && selectedFromAyah)
                ? parseInt(selectedFromAyah.value)
                : 1;

            updateAyahOptions(surahNumber, setToAyahOptions2, startAyah);
        }
    };
    // تغيير الآية الثانية
    const handleToAyahChange = (selectedOption) => {
        setSelectedToAyah(selectedOption);
    };
    
    const goToStudentEvaluation = () => {
        const selectedData = {
            sectionTitle : sectionTitle,
            fromSurah: selectedSurah1,
            fromAyah: selectedFromAyah,
            toSurah: selectedSurah2,
            toAyah: selectedToAyah, 
        };
        // تخزين البيانات في LocalStorage
        localStorage.setItem('selectedHifzData', JSON.stringify(selectedData));

        navigate("/StudentEvaluation");
    };
    
    return (
        <div className={`add-hifz-review ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            <h2>{sectionTitle}</h2>

            <div className="selection-section">
                <label>{t.fromSurah}</label>
                <Select
                    options={surahOptions}
                    onChange={handleSurah1Change}
                    className="custom-select"
                    placeholder={t.fromSurah}
                />
            </div>

            {selectedSurah1 && (
                <div className="selection-section">
                    <label>{t.fromAyah}</label>
                    <Select
                        options={fromAyahOptions1}
                        onChange={handleFromAyahChange}
                        className="custom-select"
                        placeholder={t.fromAyah}
                        value={selectedFromAyah}
                    />
                </div>
            )}

            {selectedFromAyah && (
                <div className="selection-section">
                    <label>{t.toSurah}</label>
                    <Select
                        options={toSurahOptions}
                        onChange={handleSurah2Change}
                        className="custom-select"
                        placeholder={t.toSurah}
                    />
                </div>
            )}

            {selectedSurah2 && (
                <div className="selection-section">
                    <label>{t.toAyah}</label>
                    <Select
                        options={toAyahOptions2}
                        onChange={handleToAyahChange}
                        className="custom-select"
                        placeholder={t.toAyah}
                    />
                </div>
            )}

            <Button
                className="save-button"
                disabled={!selectedSurah1 || !selectedSurah2}
                onClick={goToStudentEvaluation}
            >
                {t.save}
            </Button>
        </div>
    );
}

export default AddNewHifzReview;
