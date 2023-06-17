"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/ingredience-error.js");

const WARNINGS = {};

class IngredienceAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("ingredience");
  }

  async updateMany(awid, ingredience) {
    for (let i = 0; i < ingredience.length; i++) {
      let data = { id: ingredience[i].id, amount: ingredience[i].difference };
      await this.dao.update({ ...data, awid });
    }
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("ingredienceListDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.List.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let ingredience = await this.dao.list(awid);

    // if joke does not exist (was not found in database)
    if (!ingredience) {
      throw new Errors.List.IngredienceDoesNotExist({ uuAppErrorMap }, { ingredienceId: dtoIn.id });
    }

    // return updated joke
    return {
      ...ingredience,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("ingredienceUpdateDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Update.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let ingredience = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!ingredience) {
      throw new Errors.Update.IngredienceDoesNotExist({ uuAppErrorMap }, { ingredienceId: dtoIn.id });
    }
    let ingredienceDtoOut;
    try {
      // call dao method remove to delete your joke from database
      ingredienceDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Update.IngredienceDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      ...ingredienceDtoOut,
      uuAppErrorMap,
    };
  }
  //aaa
  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("ingredienceDeleteDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Delete.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let ingredience = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!ingredience) {
      throw new Errors.Delete.IngredienceDoesNotExist({ uuAppErrorMap }, { ingredienceId: dtoIn.id });
    }
    try {
      // call dao method remove to delete your joke from database
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Delete.IngredienceDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      uuAppErrorMap,
    };
  }
  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("ingredienceGetDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Get.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let ingredience = await this.dao.get(awid, dtoIn.name);

    // if joke does not exist (was not found in database)
    if (!ingredience) {
      throw new Errors.Get.IngredienceDoesNotExist({ uuAppErrorMap }, { ingredienceId: dtoIn.id });
    }

    // return updated joke
    return {
      ...ingredience,
      uuAppErrorMap,
    };
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
      ingredience = await this.dao.create(awid, dtoIn);
    } catch (e) {
      throw new Errors.Create.IngredienceDaoCreateFailed({ uuAppErrorMap }, e);
    }
    const dtoOut = {
      ...ingredience,
      uuAppErrorMap,
    };
    return dtoOut;
  }
}

module.exports = new IngredienceAbl();
