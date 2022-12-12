const ingredienceCreateDtoInType = shape({
  name: string(255).isRequired(),
  amount: integer(400).isRequired(),
  category: string(255).isRequired(),
});/* eslint-disable */
