// UserHalqatRequestModel.js

// نموذج UserHalqatRequestModel في React JavaScript
import { kHalqaName, kTypeName, kHalqaTime, kStatus, kStudentsCount } from 'ehsan/core/utils/constants';

export const UserHalqatRequestModel = ({
    halqaName,
    halqaTypeName,
    halqaTime,
    status,
    studentsCount,
}) => ({
    halqaName,
    halqaTypeName,
    halqaTime,
    status,
    studentsCount,
});

// تحويل كائن إلى Map
export const toMap = (request) => ({
    [kHalqaName]: request.halqaName,
    [kTypeName]: request.halqaTypeName,
    [kHalqaTime]: request.halqaTime,
    [kStatus]: request.status,
    [kStudentsCount]: request.studentsCount,
});

// تحويل Map إلى UserHalqatRequestModel
export const fromMap = (map) => ({
    halqaName: map[kHalqaName],
    halqaTypeName: map[kTypeName],
    halqaTime: map[kHalqaTime],
    status: map[kStatus],
    studentsCount: map[kStudentsCount],
});
