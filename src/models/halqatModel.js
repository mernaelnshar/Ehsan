class HalqatModel {
    constructor(halqaId, halqaName, halqaTypeId) {
        this.halqaId = halqaId;
        this.halqaName = halqaName;
        this.halqaTypeId = halqaTypeId;
    }
}
export default HalqatModel;

// // مثال على كيفية إنشاء كائن من هذا الكلاس
// const halqa = new HalqatModel('1', 'Halqa Name', 'Type1');
// console.log(halqa);
