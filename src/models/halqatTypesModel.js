class HalqatTypesModel {
    constructor(typeId, typeName, rating) {
      this.typeId = typeId;
      this.typeName = typeName;
      this.rating = rating; // توقع أن يكون مصفوفة من السلاسل النصية
    }
  }
  
  export default HalqatTypesModel;
//   // مثال على كيفية إنشاء كائن من هذا الكلاس
//   const halqatType = new HalqatTypesModel('1', 'Type Name', ['Excellent', 'Good', 'Average']);
//   console.log(halqatType);
  