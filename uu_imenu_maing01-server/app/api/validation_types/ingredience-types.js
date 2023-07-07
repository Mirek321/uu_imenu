/* eslint-disable */
const ingredienceCreateDtoInType = shape({
  name: string(255).isRequired(),
  amount: float(400).isRequired(),
  unit: string(400).isRequired(),
  unitPl: float(400),
  unitKl: float(400)
  // allergen: string(255).isRequired(),
  // category: string(255).isRequired(),
  // cashReceiptName: string(255),
  // cashReceiptAmount: float(255),
});

const ingredienceGetDtoInType = shape({
  id: id(),
  cashReceiptName: string(400),

});
const ingredienceDeleteDtoInType = shape({
  id: id().isRequired(),
});
const ingredienceUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  amount: float(400),
  unit: string(400),
  unitPl: float(400),
  unitKl: float(400)
  // allergen: string(100),
  // category: string(255),
  // cashReceiptName: string(255),
  // cashReceiptAmount: float(255),
});
const ingredienceListDtoInType = shape({

});
