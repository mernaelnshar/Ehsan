class HalqatDetailsModel {
    constructor(sessionId, halqaId, halqaTime, teacherId, studentsId, studentsCount, halqaName, halqaTypeName, active) {
        this.sessionId = sessionId;
        this.halqaId = halqaId;
        this.halqaTime = halqaTime;
        this.teacherId = teacherId;
        this.studentsId = studentsId;
        this.studentsCount = studentsCount;
        this.halqaName = halqaName;
        this.halqaTypeName = halqaTypeName;
        this.active = active;
    }
}

export default HalqatDetailsModel;
