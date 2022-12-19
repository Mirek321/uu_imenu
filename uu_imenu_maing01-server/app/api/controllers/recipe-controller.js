"use strict";
const RecipeAbl = require("../../abl/recipe-abl.js");

class RecipeController {

  create(ucEnv) {
    return RecipeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new RecipeController();
