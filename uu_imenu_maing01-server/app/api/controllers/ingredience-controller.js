"use strict";
const IngredienceAbl = require("../../abl/ingredience-abl.js");

class IngredienceController {

  get(ucEnv) {
    return IngredienceAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return IngredienceAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new IngredienceController();
