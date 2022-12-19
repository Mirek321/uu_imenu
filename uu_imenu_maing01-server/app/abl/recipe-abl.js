"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/recipe-error.js");

const WARNINGS = {};

class RecipeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("recipe");
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};
    // hds 2, 2.1
    const validationResult = this.validator.validate("recipeCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Errors.Create.InvalidDtoIn
    );
    let recipe;
    try {
      recipe = await this.dao.create(awid, dtoIn);
    } catch (e) {
      throw new Errors.Create.RecipeDaoCreateFailed({ uuAppErrorMap }, e);
    }
    const dtoOut = {
      ...recipe,
      uuAppErrorMap,
    };
    return dtoOut;
  }
}

module.exports = new RecipeAbl();
