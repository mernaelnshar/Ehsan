export const getSoraNames = () => {
    return [
        'الفاتحة',
        'البقرة',
        'آل عمران',
        'النساء',
        'المائدة',
        'الأنعام',
        'الأعراف',
        'الأنفال',
        'التوبة',
        'يونس',
        'هود',
        'يوسف',
        'الرعد',
        'إبراهيم',
        'الحجر',
        'النحل',
        'الإسراء',
        'الكهف',
        'مريم',
        'طه',
        'الأنبياء',
        'الحج',
        'المؤمنون',
        'النور',
        'الفرقان',
        'الشعراء',
        'النمل',
        'القصص',
        'العنكبوت',
        'الروم',
        'لقمان',
        'السجدة',
        'الأحزاب',
        'سبأ',
        'فاطر',
        'يس',
        'الصافات',
        'ص',
        'الزمر',
        'غافر',
        'فصلت',
        'الشورى',
        'الزخرف',
        'الدخان',
        'الجاثية',
        'الأحقاف',
        'محمد',
        'الفتح',
        'الحجرات',
        'ق',
        'الذاريات',
        'الطور',
        'النجم',
        'القمر',
        'الرحمن',
        'الواقعة',
        'الحديد',
        'المجادلة',
        'الحشر',
        'الممتحنة',
        'الصف',
        'الجمعة',
        'المنافقون',
        'التغابن',
        'الطلاق',
        'التحريم',
        'الملك',
        'القلم',
        'الحاقة',
        'المعارج',
        'نوح',
        'الجن',
        'المزمل',
        'المدثر',
        'القيامة',
        'الإنسان',
        'المرسلات',
        'النبأ',
        'النازعات',
        'عبس',
        'التكوير',
        'الانفطار',
        'المطففين',
        'الانشقاق',
        'البروج',
        'الطارق',
        'الأعلى',
        'الغاشية',
        'الفجر',
        'البلد',
        'الشمس',
        'الليل',
        'الضحى',
        'الشرح',
        'التين',
        'العلق',
        'القدر',
        'البينة',
        'الزلزلة',
        'العاديات',
        'القارعة',
        'التكاثر',
        'العصر',
        'الهمزة',
        'الفيل',
        'قريش',
        'الماعون',
        'الكوثر',
        'الكافرون',
        'النصر',
        'المسد',
        'الإخلاص',
        'الفلق',
        'الناس',
    ];
}
export const getSoraList = () => {
    return [
        1,
        8,
        294,
        494,
        670,
        790,
        955,
        1161,
        1236,
        1365,
        1474,
        1597,
        1708,
        1751,
        1803,
        1902,
        2030,
        2141,
        2251,
        2349,
        2484,
        2596,
        2674,
        2792,
        2856,
        2933,
        3160,
        3253,
        3341,
        3410,
        3470,
        3504,
        3534,
        3607,
        3661,
        3706,
        3789,
        3971,
        4059,
        4134,
        4219,
        4273,
        4326,
        4415,
        4474,
        4511,
        4546,
        4584,
        4613,
        4631,
        4676,
        4736,
        4785,
        4847,
        4902,
        4980,
        5076,
        5105,
        5127,
        5151,
        5164,
        5178,
        5189,
        5200,
        5218,
        5230,
        5242,
        5272,
        5324,
        5376,
        5420,
        5448,
        5476,
        5496,
        5552,
        5592,
        5623,
        5673,
        5713,
        5759,
        5801,
        5830,
        5849,
        5885,
        5910,
        5932,
        5949,
        5968,
        5994,
        6024,
        6044,
        6059,
        6080,
        6091,
        6099,
        6107,
        6126,
        6131,
        6139,
        6147,
        6158,
        6169,
        6177,
        6180,
        6189,
        6194,
        6198,
        6205,
        6208,
        6214,
        6217,
        6222,
        6226,
        6231,
    ];
}

// تحديد ترتيب السورة بناءً على رقم الآية
export const getIndex = (items, ayaId) => {
    for (let i = 0; i < items.length; i++) {
        if(ayaId === items[i]) return i+1;
        if(ayaId < items[i]) return i;
    }
    return items.length;
};

// إرجاع السورة والآية بناءً على رقم الآية
export const posFromAya = (ayaId) => {
    const soraList = getSoraList();
    const soraNumber = getIndex(soraList, ayaId);
    return [soraNumber, ayaId - soraList[soraNumber - 1] + 1];
};
// إرجاع رقم الآية بناءً على السورة ورقم الآية
// إرجاع رقم الآية بناءً على السورة ورقم الآية
export const ayaFromPos = (soraNumber, ayaNumber) => {
    const soraList = getSoraList();
    return soraList[soraNumber - 1] + ayaNumber - 1;
};


// عدد الآيات في السورة
export const ayat = (soraNumber) => {
    if (soraNumber === 114) return 6;
    const soraList = getSoraList();
    return soraList[soraNumber] - soraList[soraNumber - 1];
};



// اسم السورة بناءً على رقم الآية
export const soraName = (ayaId) => {
    const soraName = getSoraNames()[posFromAya(ayaId)[0] - 1];
    return soraName;
};


// جلب النص الكامل للآية (يحتاج تحميل الملف)

let quranCache = null;

// تأكد من تصدير الدالة بشكل صحيح
export const loadQuranJson = async () => {
    if (quranCache) return quranCache;

    try {
        const response = await fetch(`${process.env.PUBLIC_URL}/quran.json`);        quranCache = await response.json();
        console.log("✅ Quran JSON Loaded Successfully!");
        return quranCache;
    } catch (error) {
        console.error("❌ Error loading Quran JSON:", error);
        return null;
    }
};


export const ayaText = (ayaId) => {
    if (!quranCache) {
        console.warn("⏳ Quran JSON is not loaded yet!");
        return "Loading ....";
    }
    return quranCache[ayaId - 1] || "Aya not found";
};




// دالة إنشاء قائمة السور بناءً على المنهج الدراسي
export const getSowarList = (curriculum) => {
    if (!curriculum || typeof curriculum !== 'string') {
        console.warn('Invalid curriculum value:', curriculum);
        return [];
    }

    const sowarList = [];
    const soraList = getSoraList();
    const soraNames = getSoraNames();

    let [from, to] = curriculum.split('-').map(Number);

    from = soraList.filter(element => element <= from).length;
    to = soraList.filter(element => element <= to).length;

    for (let i = from; i <= to; i++) {
        if (i - 1 < soraNames.length) {
            sowarList.push({
                value: i.toString(),
                label: soraNames[i - 1]
            });
        }
    }

    return sowarList;
};


// قائمة الآيات بناءً على السورة
export const getAyaList = (soraNumber) => {
    if (soraNumber === -1) return [];
    return Array.from({ length: ayat(soraNumber) }, (_, i) => ({
        value: ayaFromPos(soraNumber, i + 1).toString(),
        label: (i + 1).toString()
    }));
};



// دالة لجلب النصوص المترجمة بناءً على اللغة المحددة
export const getTranslatedText = (language) => {
    return {
        ar: {
            sectionTitle: "إضافة حفظ أو مراجعة جديدة",
            fromSurah: "من السورة:",
            toSurah: "إلى السورة:",
            fromAyah: "من الآية:",
            toAyah: "إلى الآية:",
            save: "حفظ"
        },
        en: {
            sectionTitle: "Add New Hifz or Review",
            fromSurah: "From Surah:",
            toSurah: "To Surah:",
            fromAyah: "From Ayah:",
            toAyah: "To Ayah:",
            save: "Save"
        }
    }[language];
};

// دالة لإعادة تعيين الخيارات لتجنب تداخل البيانات القديمة مع الجديدة
// services/quranJsonService.js

export const resetSelections = (
    setFromAyahOptions1,
    setSelectedFromAyah,
    setSelectedSurah2,
    setToAyahOptions2,
    setSelectedToAyah
) => {
    if (typeof setFromAyahOptions1 === 'function') setFromAyahOptions1([]);
    if (typeof setSelectedFromAyah === 'function') setSelectedFromAyah(null);
    if (typeof setSelectedSurah2 === 'function') setSelectedSurah2(null);
    if (typeof setToAyahOptions2 === 'function') setToAyahOptions2([]);
    if (typeof setSelectedToAyah === 'function') setSelectedToAyah(null);
};



// دالة لتحديث خيارات الآيات بناءً على رقم السورة المختارة
export const updateAyahOptions = (surahNumber, setAyahOptions, startAyah = 1, curriculum = '1-6238') => {

    const surahName = getSowarList(curriculum).find((s) => s.value === surahNumber.toString());
    const surah = surahName ? { ...surahName, ayahs: ayat(surahNumber) } : null;


    if (surah) {
        const options = [];
        for (let i = startAyah; i <= surah.ayahs; i++) {
            options.push({ value: i.toString(), label: `آية ${i}` });
        }

        setAyahOptions(options);
    } else {
        console.warn('Surah not found:', surahNumber);
        setAyahOptions([]);
    }
};
