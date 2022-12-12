"use strict";
const IngredienceAbl = require("../../abl/ingredience-abl.js");

class IngredienceController {

  create(ucEnv) {
    return IngredienceAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new IngredienceController();
