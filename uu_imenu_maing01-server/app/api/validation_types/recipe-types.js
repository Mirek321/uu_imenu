/* eslint-disable */
const recipeCreateDtoInType = shape({
  name: string(255).isRequired(),
  type_recipe: string(255),

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
  portion: integer(),
  count_meals: array(shape({
    name: string(255),
    count: integer(250),
  })),
  days: array(),
  category: array(),
});
