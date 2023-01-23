/* eslint-disable */
const ingredienceCreateDtoInType = shape({
  name: string(255).isRequired(),
  amount: float(400).isRequired(),
  unit: string(400).isRequired(),
  allergen: boolean().isRequired(),
  category: string(255).isRequired(),
});

const ingredienceGetDtoInType = shape({
  id: id().isRequired(),
});
const ingredienceDeleteDtoInType = shape({
  id: id().isRequired(),
});
const ingredienceUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  amount: float(400),
  unit: string(400),
  allergen: string(100),
  category: string(255),
});
const ingredienceListDtoInType = shape({

});
