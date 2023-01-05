"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/recipe-error.js");
const Ingredience = require("../abl/ingredience-abl.js");
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
    let amounts = recipe.ingredience.map((amount) => amount.amount);
    recipe.ingredience = await this.ing.load(awid, recipe.ingredience);

    for (let i = 0; i < amounts.length; i++) {
      recipe.ingredience.itemList[i].amount_recipe = amounts[i];
    }

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
  async comprassion(awid, recipe, porcie) {
    let ingrediences = [];

    for (let i = 0; i < recipe.ingredience.itemList.length; i++) {
      ingrediences.push({
        name: recipe.ingredience.itemList[i].name,
        id: JSON.parse(JSON.stringify(recipe.ingredience.itemList[i].id)),
        amount_need: recipe.ingredience.itemList[i].amount_recipe * porcie,
        difference: recipe.ingredience.itemList[i].amount - recipe.ingredience.itemList[i].amount_recipe * porcie,
      });

      if (ingrediences[i].difference > 0) {
        ingrediences[i].suit = true;
      } else if (ingrediences[i].difference == 0) {
        ingrediences[i].suit = true;
      } else if (ingrediences[i].difference < 0) {
        ingrediences[i].suit = false;
      } else {
        ingrediences[i].suit = "error";
      }
    }
    const check = ingrediences.every(({ suit }) => suit);
    if (check) {
      for (let i = 0; i < ingrediences.length; i++) {
        await Ingredience.update(awid, { id: ingrediences[i].id, amount: ingrediences[i].difference });
      }
    } else {
      // pass;
    }

    return ingrediences;
  }
  async generate(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeGenerateDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Generate.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let pocet = 2;
    let porcie = 2;
    let recipe = await this.dao.generate(dtoIn, pocet);
    let ingrediences = [];
    for (let i = 0; i < pocet; i++) {
      let id = JSON.parse(JSON.stringify(recipe[i]._id));
      let recipe_load = await this.load(awid, { id: id });
      ingrediences.push({
        id: id,
        name: recipe_load.name,
        ingredience: await this.comprassion(awid, recipe_load, porcie),
      });
    }

    /* for (let i = 0; i < update_ingrediences.length; i++) {

    }*/
    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Generate.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    //comprassion(recipe, porcie);
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
    //a
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
