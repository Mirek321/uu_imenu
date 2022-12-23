/* eslint-disable */
const recipeCreateDtoInType = shape({
  name: string(255).isRequired(),
  category: string(255).isRequired(),
  type_recipe: string(255).isRequired(),
  ingredience: shape({
    id:id().isRequired(),
    amount: integer(400).isRequired(),
  }),
});
const recipeGetDtoInType = shape({
  id: id().isRequired(),
});
const recipeDeleteDtoInType = shape({
  id: id().isRequired(),
});
const recipeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  ingredience: shape({
    id:id(),
    amount: integer(400),
  }),
});
const recipeListDtoInType = shape({

});
const recipeGenerateDtoInType = shape({
  type_recipe: string(250),
  category: string(250)
});
