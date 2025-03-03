// UserHalqatHomeModel.js

// نموذج UserHalqatHomeModel في React JavaScript
export const UserHalqatHomeModel = ({
    teacherUid,
    halqaName,
    halqaTypeName,
    halqaTime,
    role,
    studentsCount,
    sessionId,
    attendance = '',
    totalAttendance = '',
    rating = {},
  }) => ({
    teacherUid,
    halqaName,
    halqaTypeName,
    halqaTime,
    role,
    studentsCount,
    sessionId,
    attendance,
    totalAttendance,
    rating,
  });
  