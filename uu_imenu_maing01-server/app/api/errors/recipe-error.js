"use strict";

const ImenuMainUseCaseError = require("./imenu-main-use-case-error.js");
const RECIPE_ERROR_PREFIX = `${ImenuMainUseCaseError.ERROR_PREFIX}recipe/`;

const Create = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}create/`,
  RecipeDaoCreateFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

module.exports = {
  Create,
};
