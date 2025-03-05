import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "./firebaseConfig"; // تأكد من إعداد Firebase
import HalqatDetailsModel  from "../models/halqatDetailsModel";
import HalqatModel from "../models/halqatModel"; // استيراد الموديل


// رسائل الخطأ المستخدمة
const ERROR_MESSAGES = {
    PASSWORD_WEAK: "كلمة المرور ضعيفة جدًا",
    EMAIL_IN_USE: "البريد الإلكتروني مستخدم بالفعل",
    USER_NOT_FOUND: "المستخدم غير موجود",
    WRONG_PASSWORD: "كلمة المرور غير صحيحة",
    GENERAL_ERROR: "حدث خطأ، حاول مرة أخرى",
};

class FirebaseService {
    constructor() {
        this.auth = getAuth(app);
        this.firestore = getFirestore(app);
    }

    async createUser(userModel, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, userModel.email, password);
            const uid = userCredential.user.uid;

            // حفظ بيانات المستخدم في Firestore
            await setDoc(doc(this.firestore, "users", uid), { ...userModel, uid });
        } catch (error) {
            if (error.code === "auth/weak-password") {
                throw new Error(ERROR_MESSAGES.PASSWORD_WEAK);
            } else if (error.code === "auth/email-already-in-use") {
                throw new Error(ERROR_MESSAGES.EMAIL_IN_USE);
            }
            throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
        }
    }

    async signInUser(email, password) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            } else if (error.code === "auth/wrong-password") {
                throw new Error(ERROR_MESSAGES.WRONG_PASSWORD);
            }
            throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
        }
    }
}

export const getHalqatTypes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "halqatTypes"));
        const types = querySnapshot.docs.map((doc) => ({
            typeId: doc.id,
            ...doc.data(),
        }));
        return types;
    } catch (error) {
        console.error("Error fetching halqat types:", error);
        return [];
    }
};

// دالة لجلب الحلقات بناءً على نوع الحلقة للطلاب
export const getHalqatByTypeStudent = async (halqaTypeId) => {
    try {
        const halqatList = [];
        let halqatDetailsList = [];
        const halqatIdSet = new Set();

        // جلب الحلقات بناءً على نوع الحلقة
        const halqatQuery = query(
            collection(db, "halqat"),
            where("halqaTypeId", "==", halqaTypeId)
        );

        const querySnapshot = await getDocs(halqatQuery);

        querySnapshot.forEach((doc) => {
            halqatList.push(
                new HalqatModel(
                    doc.id,
                    doc.data().halqaName || "",
                    doc.data().halqaTypeId || ""
                )
            );
        });

        // إضافة الـ halqaId إلى المجموعة
        halqatList.forEach((halqa) => {
            halqatIdSet.add(halqa.halqaId);
        });

        // جلب تفاصيل الحلقات
        const halqatDetailsQuery = query(
            collection(db, "halqatDetails"),
            where("teacherUid", "!=", null)
        );

        const detailsSnapshot = await getDocs(halqatDetailsQuery);

        detailsSnapshot.forEach((doc) => {
            const data = doc.data();
            if (halqatIdSet.has(data.halqaId) && (data.studentsCount || 0) < 26) {
                halqatDetailsList.push(
                    new HalqatDetailsModel(
                        doc.id,
                        data.halqaId || "",
                        data.halqaTime || "",
                        data.teacherUid || "",
                        data.studentsUid || [],
                        data.studentsCount || 0,
                        data.halqaName || "",
                        data.typeName || "",
                        data.active || false
                    )
                );
            }
        });

        // التحقق من الحلقات الموجودة وإزالة الغير مرتبطة
        halqatList.forEach((halqa) => {
            const isExist = halqatDetailsList.some(
                (details) => details.halqaId === halqa.halqaId
            );
            if (!isExist) {
                halqatDetailsList = halqatDetailsList.filter(
                    (details) => details.halqaId !== halqa.halqaId
                );
            }
        });

        return halqatDetailsList;
    } catch (error) {
        console.error("Failed to fetch halqat by type for students", error);
        throw new Error("Failed to fetch halqat by type for students");
    }
};


export const getSessionTimes = async (halqaId) => {
    try {
        const q = query(collection(db, "halqatDetails"), where("halqaId", "==", halqaId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ 
            timeId: doc.id, 
            halqaTime: doc.data().halqaTime 
        }));
    } catch (error) {
        console.error("Error fetching session times:", error.message);
        return [];
    }
};


// timeFormatter.js
// timeFormatter.js
export const formatTime = ({ time, translations = {} }) => {
    let startTime = parseInt(time, 10);
    let endTime = startTime + 2;

    // استخدمي القيم الافتراضية لو القيم الأساسية غير موجودة
    const startPeriod = startTime >= 12 && startTime < 24 ? (translations.PM || "PM") : (translations.AM || "AM");
    let endPeriod = endTime >= 12 && endTime < 24 ? (translations.PM || "PM") : (translations.AM || "AM");

    if (startTime === 0) startTime = 12;
    if (startTime > 12 && startTime < 24) startTime -= 12;
    if (endTime > 12 && endTime < 24) endTime -= 12;
    if (endTime >= 24) {
        endTime -= 24;
        endPeriod = translations.AM || "AM";
    }
    if (endTime === 0) endTime = 12;

    return `${translations.From || "From"} ${startTime} ${startPeriod} ${translations.To || "To"} ${endTime} ${endPeriod}`;
};




// استخدام نمط Singleton
const firebaseServiceInstance = new FirebaseService();
export default firebaseServiceInstance;
