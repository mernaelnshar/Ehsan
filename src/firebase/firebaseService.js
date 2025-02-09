import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // تأكد من إعداد Firebase

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

// استخدام نمط Singleton
const firebaseServiceInstance = new FirebaseService();
export default firebaseServiceInstance;
