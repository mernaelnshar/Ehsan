import "../../styles/Profile.css";
import { FaUser, FaEdit } from "react-icons/fa";
import { Form, Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider , verifyBeforeUpdateEmail , signOut  } from "firebase/auth";

const texts = {
    generalInfo: { ar: "معلومات عامة", en: "General Information" },
    username: { ar: "اسم المستخدم", en: "Username" },
    birthDate: { ar: "تاريخ الميلاد", en: "Birth Date" },
    nationalId: { ar: "رقم ID", en: "ID Number" },
    contactInfo: { ar: "معلومات الاتصال", en: "Contact Information" },
    mobileNumber: { ar: "رقم الهاتف", en: "Phone Number" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    deleteAccount: { ar: "حذف الحساب", en: "Delete Account" },
    confirmDelete: { ar: "هل أنت متأكد من انك تريد حذف الحساب؟", en: "Are you sure you want to delete your account?" },
    no: { ar: "لا", en: "No" },
    yes: { ar: "نعم", en: "Yes" },
    editContact: { ar: "تعديل بيانات الاتصال", en: "Edit Contact Information" },
    cancel: { ar: "إلغاء", en: "Cancel" },
    saveChanges: { ar: "حفظ التعديلات", en: "Save Changes" },
    accountDeleted: { ar: "تم حذف الحساب بنجاح!", en: "Account deleted successfully!" },
    errorDeleting: { ar: "حدث خطأ أثناء حذف الحساب!", en: "An error occurred while deleting the account!" },
    confirmpasswordPlaceholder: { ar: "يرجى إدخال كلمة المرور لتأكيد حذف الحساب:", en: "Please enter your password to confirm account deletion:" },
    passwordPlaceholder: { ar: "يجب إدخال كلمة المرور!", en: "Password must be entered!" },
};

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserDetails = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserDetails(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const { language } = useContext(LanguageContext);
    const isArabic = language === "ar";
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDelete = async () => {
        if (!auth.currentUser) return;
        try {

            const password = prompt(texts.confirmpasswordPlaceholder[language]);
            if (!password) return alert(texts.passwordPlaceholder[language]);
            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);

            const userRef = doc(db, "users", auth.currentUser.uid);
            await deleteDoc(userRef);
            await deleteUser(auth.currentUser);
            alert(texts.accountDeleted[language]);
            navigate("/login");

        } catch (error) {

            console.error("Error deleting account: ", error);
            alert(texts.errorDeleting[language]);
        }
    }



    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPhone, setEditedPhone] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    useEffect(() => {
        if (userDetails) {
            setEditedPhone(userDetails.mobileNumber || "");
            setEditedEmail(userDetails.email || "");
        }
    }, [userDetails]);

    const handleEditShow = () => setShowEditModal(true);
    const handleEditClose = () => setShowEditModal(false);

    const handleSaveChanges = async () => {
        if (!auth.currentUser) return;
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
        
            // تحديث رقم الهاتف مباشرةً
            await updateDoc(userRef, { mobileNumber: editedPhone });
    
            if (editedEmail !== auth.currentUser.email) {
                const password = prompt(texts.confirmpasswordPlaceholder[language]);
                if (!password) return alert(texts.passwordPlaceholder[language]);
    
                const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
                await reauthenticateWithCredential(auth.currentUser, credential); // إعادة المصادقة ✅
    
                // إرسال تأكيد للبريد الجديد
                await verifyBeforeUpdateEmail(auth.currentUser, editedEmail);
                alert("A verification email has been sent to your new email. Please confirm it to complete the update.");

                await updateDoc(userRef, { email: editedEmail });
                // تسجيل خروج المستخدم وتوجيهه إلى صفحة تسجيل الدخول
                await signOut(auth);
                navigate("/login");
            } else {
                alert("Profile updated successfully!");
            }
    
            handleEditClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(`Error: ${error.message}`);
        }
    };
    
    
    
    return (
        <div className={`profile-container ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
            {userDetails ? (
                <>
                    <Container className="profile-content">
                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title className="profile-title">{texts.generalInfo[language]}</Card.Title>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.username[language]}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={`${userDetails.firstName} ${userDetails.fatherName} ${userDetails.familyName}`}
                                                    disabled
                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.birthDate[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.birthDate} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.nationalId[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.nationalId} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title className="profile-title">
                                    {texts.contactInfo[language]} <FaEdit className="edit-icon" onClick={handleEditShow} />
                                </Card.Title>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.mobileNumber[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.mobileNumber} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>{texts.email[language]}</Form.Label>
                                                <Form.Control type="text" value={userDetails.email} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Button className="del-btn" onClick={handleShow}>
                            {texts.deleteAccount[language]}
                        </Button>
                    </Container>

                    <Container className="profile-image">
                        <FaUser size={100} className="user-icon" />
                        <h3>{`${userDetails.firstName} ${userDetails.fatherName} ${userDetails.familyName}`}</h3>
                    </Container>

                    <Modal show={showModal} onHide={handleClose} className={`modal-delet-profile ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"} centered>
                        <Modal.Body className="modal-content">
                            <h3>{texts.confirmDelete[language]}</h3>
                            <Modal.Footer>
                                <Button className="btn cancel-btn" onClick={handleClose}>{texts.no[language]}</Button>
                                <Button className="btn confirm-btn" onClick={handleDelete}>{texts.yes[language]}</Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal>

                    <Modal
                        show={showEditModal}
                        onHide={handleEditClose}
                        className={`modal-edit-profile ${isArabic ? "rtl" : "ltr"}`}
                        dir={isArabic ? "rtl" : "ltr"}
                        centered
                    >
                        <Modal.Body className="modal-content">
                            <h3>{texts.editContact[language]}</h3>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>{texts.mobileNumber[language]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedPhone}
                                        onChange={(e) => setEditedPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>{texts.email[language]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            <Modal.Footer>
                                <Button className="btn cancel-btn" onClick={handleEditClose}>
                                    {texts.cancel[language]}
                                </Button>
                                <Button className="btn save-btn" onClick={handleSaveChanges}>
                                    {texts.saveChanges[language]}
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal>



                </>
            ) : (
                <p>Loading...</p>
            )}


        </div>
    );
};

export default Profile;
