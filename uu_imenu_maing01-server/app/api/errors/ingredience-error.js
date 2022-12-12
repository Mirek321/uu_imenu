"use strict";

const ImenuMainUseCaseError = require("./imenu-main-use-case-error.js");
const INGREDIENCE_ERROR_PREFIX = `${ImenuMainUseCaseError.ERROR_PREFIX}ingredience/`;

const Create = {
  UC_CODE: `${INGREDIENCE_ERROR_PREFIX}create/`,
  IngredienceDaoCreateFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ingredienceDaoCreateFailed`;
      this.message = "Create ingredience by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ingredienceDaoCreateFailed`;
      this.message = "Create ingredience by imenu DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${INGREDIENCE_ERROR_PREFIX}get/`,
  IngredienceDaoGetFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}ingredienceDaoCreateFailed`;
      this.message = "Create ingredience by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}ingredienceDaoCreateFailed`;
      this.message = "Create ingredience by imenu DAO create failed.";
    }
  },
  IngredienceDoesNotExist: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}ingredienceDaoCreateFailed`;
      this.message = "Create ingredience by imenu DAO create failed.";
    }
  },
};

module.exports = {
  Get,
  Create
};
