const ingredienceCreateDtoInType = shape({
  name: string(255).isRequired(),
  amount: integer(400).isRequired(),
  unit: string(400).isRequired(),
  allergen: string(100).isRequired(),
  category: string(255).isRequired(),
});/* eslint-disable */

const ingredienceGetDtoInType = shape({
  id: id().isRequired(),
});
const ingredienceDeleteDtoInType = shape({
  id: id().isRequired(),
});
const ingredienceUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  amount: integer(400),
  unit: string(400),
  allergen: string(100),
  category: string(255),
});
const ingredienceListDtoInType = shape({

});
