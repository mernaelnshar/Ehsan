import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "./firebaseConfig"; // تأكد من إعداد Firebase
import HalqatDetailsModel  from "../models/halqatDetailsModel";

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
        const halqatIdSet = new Set();

        // إنشاء استعلام لجلب الحلقات من Firebase
        const halqatQuery = query(
            collection(db, "halqat"),
            where("halqaTypeId", "==", halqaTypeId)
        );

        const querySnapshot = await getDocs(halqatQuery);

        // التكرار على النتائج وملء بيانات الحلقات
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const halqaId = doc.id;

            if (!halqatIdSet.has(halqaId)) {
                halqatIdSet.add(halqaId);
                halqatList.push(
                    new HalqatDetailsModel(
                        data.sessionId || '',
                        halqaId,
                        data.halqaName || '',
                        data.halqaTime || '',
                        data.halqaTypeName || '',
                        data.teacherId || '',
                        data.studentsId || [],
                        data.studentsCount || 0,
                        data.active || false
                    )
                );
            }
        });

        return halqatList; // إرجاع قائمة الحلقات
    } catch (error) {
        console.error("Error fetching Halqat:", error);
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
