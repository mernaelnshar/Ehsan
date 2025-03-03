export const kHorizontalPadding = 32.0;

// Firebase

// Meta Data
export const kMetaDataCollection = 'metaData';
export const kCount = 'count';
export const kHalqatTypesCounter = 'halqatTypesCounter';
export const kHalqatCounter = 'halqatCounter';
export const kSessionsCounter = 'sessionsCounter';
export const kManhagCounter = 'manhagCounter';

// User
export const kEmail = 'email';
export const kUserCollection = 'users';
export const kNationalId = 'nationalId';
export const kBirthDate = 'birthDate';
export const kFirstName = 'firstName';
export const kFatherName = 'fatherName';
export const kGrandFatherName = 'grandFatherName';
export const kFamilyName = 'familyName';
export const kGender = 'gender';
export const kNationality = 'nationality';
export const kCode = 'code';
export const kMobileNumber = 'mobileNumber';

// Halqat Types
export const kHalqatTypeCollection = 'halqatTypes';
export const kTypeId = 'typeId';
export const kTypeName = 'typeName';
export const kRating = 'rating';

// Halqat
export const kHalqatCollection = 'halqat';
export const kHalqaId = 'halqaId';
export const kHalqaTypeId = 'halqaTypeId';
export const kHalqaName = 'halqaName';

// Halqat Details
export const kHalqatDetailsCollection = 'halqatDetails';
export const kSessionId = 'sessionId';
export const kTeacherUid = 'teacherUid';
export const kStudentsCount = 'studentsCount';
export const kHalqaTime = 'halqaTime';
export const kStudentsUid = 'studentsUid';
export const kHalqatDetailsList = 'halqatDetailsList';
export const kHalqatListFinal = 'halqatListFinal';
export const kStudentRole = '1';
export const kTeacherRole = '2';
export const kActive = 'active';

// Requests
export const kRequestsCollection = 'requests';
export const kUid = 'uid';
export const kRole = 'role';
export const kRequestStatus = '1';
export const kAcceptedStatus = '2';
export const kName = 'name';


// Teachers
export const kTeachersCollection = 'teachers';
export const kDay = 'day';
export const kMonth = 'month';
export const kYear = 'year';
export const kAttendance = 'attendance';
export const kAttended = '1';
export const kAbsent = '2';
export const kAttendedCount = 'attendedCount';
export const kAbsentCount = 'absentCount';
export const kStudentsRatingCount = 'studentsRatingCount';

// Students
export const kStudentsCollection = 'students';
export const kNext = 'next';

// Manhag
export const kManhagCollection = 'manaheg';
export const kManhagId = 'manhagId';
export const kManhagName = 'manhagName';
export const kQuranManhagFrom = 'manhagFrom';
export const kQuranManhagTo = 'manhagTo';
export const kManhagTime = 'manhagTime';

// Student Manaheg
export const kStudentManhagCollection = 'studentManaheg';

// Reports
export const kReportsCollection = 'reports';
export const kSenderUid = 'senderUid';
export const kUidPersonReported = 'uidPersonReported';
export const kReason = 'reason';
export const kType = 'type';
export const kReportType = '1';
export const kDeleteRequestType = '2';
export const kDate = 'date';

// Errors
export const kPasswordWeak = 'weak-password';
export const kEmailAlreadyInUse = 'email-already-in-use';
export const kError = 'error';
export const kUserNotFound = 'user-not-found';
export const kWrongPassword = 'wrong-password';
export const kNoUserSignedIn = 'NoUserSignedIn';
export const kUserDataNotFound = 'UserDataNotFound';
export const kUpdateUserDataFailed = 'UpdateUserDataFailed';
export const kDeleteAccountFailed = 'DeleteAccountFailed';
export const kSignOutFailed = 'SignOutFailed';
export const kFailedToFetchHalqatTypes = 'FailedToFetchHalqatTypes';
export const kFailedToFetchHalqatByTypeForStudent = 'FailedToFetchHalqatByTypeForStudent';
export const kFailedToFetchHalqatByTypeForTeacher = 'FailedToFetchHalqatByTypeForTeacher';
export const kFailedToSendRequest = 'FailedToSendRequest';
export const kFailedToFetchUserHalqatStudent = 'FailedToFetchUserHalqatStudent';
export const kFailedToFetchHalqatDetails = 'FailedToFetchHalqatDetails';
export const kFailedAddHalqaType = 'FailedAddHalqaType';
export const kFailedAddHalqa = 'FailedAddHalqa';
export const kFailedToFetchRequestsByRole = 'FailedToFetchRequestsByRole';
export const kFailedToAcceptRequest = 'FailedToAcceptRequest';
export const kFailedToFetchUserHalqatTeacher = 'FailedToFetchUserHalqatTeacher';
export const kFailedToFetchUserHalqatHome = 'FailedToFetchUserHalqatHome';
export const kFailedToFetchStudentsForSession = 'FailedToFetchStudentsForSession';
export const kFailedToTakeAttendance = 'FailedToTakeAttendance';
export const kFailedToRateTeacher = 'FailedToRateTeacher';
export const kFailedToSendReport = 'FailedToSendReport';

// Admin
export const kActiveStatus = '1';
export const kInactiveStatus = '2';
