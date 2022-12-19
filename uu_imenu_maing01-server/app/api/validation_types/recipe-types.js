/* eslint-disable */
const recipeCreateDtoInType = shape({
  name: string(255).isRequired(),
  ingredience: shape({
    id:id().isRequired(),
    amount: integer(400).isRequired(),
  }),
});
