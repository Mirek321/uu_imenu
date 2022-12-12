"use strict";
const ImenuMainAbl = require("../../abl/imenu-main-abl.js");

class ImenuMainController {
  init(ucEnv) {
    return ImenuMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ImenuMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ImenuMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ImenuMainController();
