/* eslint-disable */
const recipeCreateDtoInType = shape({
  name: string(255).isRequired(),
  description: string(500),
  process: array(),
  ingredience: array(shape({
    id: string(255),
    amount: float(250),
  })),
  category: array(),
  type_recipe: string(255),
  portion: integer(255),
  link_photo: string(255)

});
const recipeGetDtoInType = shape({
  id: id().isRequired(),
});
const recipeDeleteDtoInType = shape({
  id: id().isRequired(),
});
const recipeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255).isRequired(),
  portion: integer(255),
  description: string(500),
  process: array(),
  ingredience: array(shape({
    id: string(255),
    amount: float(250),
  })),
  category: array(),
  type_recipe: string(255),
  link_photo: string(255)


});
const recipeListDtoInType = shape({

});
const recipeLoadDtoInType = shape({
  id: id().isRequired(),
});

const recipeGenerateDtoInType = shape({
  count_meals: array(shape({
    name: string(255),
    count: integer(250),
  })),
  days: array(),
  category: array(),
});
