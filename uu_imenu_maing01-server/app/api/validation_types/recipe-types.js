/* eslint-disable */
const recipeCreateDtoInType = shape({
  name: string(255).isRequired(),
  ingredience: array(shape({
    id: string(255),
    amount: integer(250),
  })),
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
const recipeLoadDtoInType = shape({
  id: id().isRequired(),
});

const recipeGenerateDtoInType = shape({
category: array(),
  type_recipe: string(255),
});
