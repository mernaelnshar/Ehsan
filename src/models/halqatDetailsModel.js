class HalqatDetailsModel {
    constructor(
        sessionId = '',
        halqaId = '',
        halqaName = '',
        halqaTime = '',
        halqaTypeName = '',
        teacherId = '',
        studentsId = [],
        studentsCount = 0,
        active = false
    ) {
        this.sessionId = sessionId; // رقم الجلسة
        this.halqaId = halqaId; // رقم الحلقة
        this.halqaName = halqaName; // اسم الحلقة
        this.halqaTime = halqaTime; // وقت الحلقة
        this.halqaTypeName = halqaTypeName; // نوع الحلقة
        this.teacherId = teacherId; // رقم المعلم
        this.studentsId = studentsId; // قائمة بأرقام الطلاب
        this.studentsCount = studentsCount; // عدد الطلاب
        this.active = active; // حالة الحلقة (نشطة أم لا)
    }
}

export default HalqatDetailsModel;
