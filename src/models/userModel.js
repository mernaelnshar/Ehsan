import { kEmail, kNationalId, kBirthDate, kFirstName, kFatherName, kGrandFatherName, kFamilyName, kGender, kNationality, kCode, kMobileNumber } from 'ehsan/core/utils/constants';

export const UserModel = ({
    email,
    nationalId,
    birthDate,
    firstName,
    fatherName,
    grandFatherName,
    familyName,
    gender,
    nationality,
    code,
    mobileNumber,
}) => ({
    email,
    nationalId,
    birthDate,
    firstName,
    fatherName,
    grandFatherName,
    familyName,
    gender,
    nationality,
    code,
    mobileNumber,
});


export const toMap = (user) => ({
    [kEmail]: user.email,
    [kNationalId]: user.nationalId,
    [kBirthDate]: user.birthDate,
    [kFirstName]: user.firstName,
    [kFatherName]: user.fatherName,
    [kGrandFatherName]: user.grandFatherName,
    [kFamilyName]: user.familyName,
    [kGender]: user.gender,
    [kNationality]: user.nationality,
    [kCode]: user.code,
    [kMobileNumber]: user.mobileNumber,
});


export const fromMap = (map) => ({
    email: map[kEmail],
    nationalId: map[kNationalId],
    birthDate: map[kBirthDate],
    firstName: map[kFirstName],
    fatherName: map[kFatherName],
    grandFatherName: map[kGrandFatherName],
    familyName: map[kFamilyName],
    gender: map[kGender],
    nationality: map[kNationality],
    code: map[kCode],
    mobileNumber: map[kMobileNumber],
});
