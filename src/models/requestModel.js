// src/models/requestModel.js
class RequestModel {
    constructor(uid, name, role, halqaName, halqaTime, halqaTypeName, halqaId, sessionId) {
        this.uid = uid;
        this.name = name;
        this.role = role;
        this.halqaName = halqaName;
        this.halqaTime = halqaTime;
        this.halqaTypeName = halqaTypeName;
        this.halqaId = halqaId;
        this.sessionId = sessionId;
    }

    toMap() {
        return {
            uid: this.uid,
            name: this.name,
            role: this.role,
            halqaName: this.halqaName,
            halqaTime: this.halqaTime,
            halqaTypeName: this.halqaTypeName,
            halqaId: this.halqaId,
            sessionId: this.sessionId,
        };
    }
}

export default RequestModel;
