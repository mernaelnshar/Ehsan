import { kUid, kName, kRole, kHalqaName, kHalqaTime, kTypeName, kHalqaId, kSessionId } from 'ehsan/core/utils/constants';

export const RequestModel = ({
    uid,
    name,
    role,
    halqaName,
    halqaTime,
    halqaTypeName,
    halqaId,
    sessionId,
}) => ({
    uid,
    name,
    role,
    halqaName,
    halqaTime,
    halqaTypeName,
    halqaId,
    sessionId,
});

export const toMap = (request) => ({
    [kUid]: request.uid,
    [kName]: request.name,
    [kRole]: request.role,
    [kHalqaName]: request.halqaName,
    [kHalqaTime]: request.halqaTime,
    [kTypeName]: request.halqaTypeName,
    [kHalqaId]: request.halqaId,
    [kSessionId]: request.sessionId,
});

export const fromMap = (map) => ({
    uid: map[kUid],
    name: map[kName],
    role: map[kRole],
    halqaName: map[kHalqaName],
    halqaTime: map[kHalqaTime],
    halqaTypeName: map[kTypeName],
    halqaId: map[kHalqaId],
    sessionId: map[kSessionId],
});
