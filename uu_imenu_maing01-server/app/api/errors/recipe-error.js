"use strict";

const ImenuMainUseCaseError = require("./imenu-main-use-case-error.js");
const RECIPE_ERROR_PREFIX = `${ImenuMainUseCaseError.ERROR_PREFIX}recipe/`;

const Create = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}create/`,
  RecipeDaoCreateFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}RecipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}RecipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}get/`,
  RecipeDaoGetFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  RecipeDoesNotExist: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}delete/`,
  RecipeDaoDeleteFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  RecipeDoesNotExist: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}update/`,
  RecipeDaoUpdateFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  RecipeDoesNotExist: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

const List = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}list/`,
  RecipeDaoListFailed: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  InvalidDtoIn: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
  RecipeDoesNotExist: class extends ImenuMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}recipeDaoCreateFailed`;
      this.message = "Create recipe by imenu DAO create failed.";
    }
  },
};

module.exports = {
  List,
  Update,
  Delete,
  Get,
  Create,
};
