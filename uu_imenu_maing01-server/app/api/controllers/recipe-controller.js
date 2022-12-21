"use strict";
const RecipeAbl = require("../../abl/recipe-abl.js");

class RecipeController {

  delete(ucEnv) {
    return RecipeAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return RecipeAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return RecipeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new RecipeController();
