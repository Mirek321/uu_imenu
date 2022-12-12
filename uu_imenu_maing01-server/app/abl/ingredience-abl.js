"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/ingredience-error.js");

const WARNINGS = {

};

class IngredienceAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("ingredience");
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};
    // hds 2, 2.1
    const validationResult = this.validator.validate("ingredienceCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Errors.Create.InvalidDtoIn
    );
    let ingredience;
    try {
      ingredience = await this.dao.create(dtoIn);
    } catch (e) {
      throw new Errors.Create.IngredienceDaoCreateFailed({ uuAppErrorMap }, e);
    }
    const dtoOut = {
      ...ingredience,
      uuAppErrorMap,
    };
//test
    return dtoOut;
  }


}

module.exports = new IngredienceAbl();
