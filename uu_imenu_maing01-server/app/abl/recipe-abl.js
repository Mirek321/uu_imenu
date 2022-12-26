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
    this.ing = DaoFactory.getDao("ingredience");
  }

  async load(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeLoadDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Load.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);
    let ing = await this.ing.get(awid, recipe.ingredience.id);
    recipe.ingredience = ing;
    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Load.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeListDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.List.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.list(awid);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.List.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeUpdateDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Update.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Update.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    let recipeDtoOut;
    try {
      // call dao method remove to delete your joke from database
      recipeDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Update.RecipeDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      ...recipeDtoOut,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeDeleteDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Delete.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Delete.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    try {
      // call dao method remove to delete your joke from database
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Delete.RecipeDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeGetDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Get.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Get.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
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
